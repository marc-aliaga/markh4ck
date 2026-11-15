---
title: "Active Directory · Parte 1 — Controlador de Dominio, DNS y DHCP"
date: 2026-11-15
category: "Active Directory"
difficulty: "Básica"
os: "Windows Server"
tags: [Active Directory, Home Lab, DNS, DHCP, PowerShell]
excerpt: "Monto un Windows Server 2022 Core como controlador de dominio desde cero, solo con PowerShell: IP estática, roles AD DS + DHCP, promoción del bosque dominio.com y el primer cliente unido."
featured: true
---

# Laboratorio Active Directory · Parte 1 — Controlador de Dominio, DNS y DHCP (Server Core)

**Entorno:** VirtualBox · Windows Server 2022 **Core** (solo consola) · dominio `dominio.com`
**Máquina:** `SERVER_DC` · **IP del DC:** `192.168.1.10/24` · **Red interna:** `192.168.1.0/24`
**Fecha:** 2026-11

> **Resumen**
> Se convierte una VM con Windows Server 2022 Core en el núcleo de una red corporativa simulada. Al terminar, el servidor es **Controlador de Dominio (AD DS)** de `dominio.com`, **servidor DNS** del dominio y **servidor DHCP** de la red interna. Todo el proceso se hace con **PowerShell**; las GPO quedan para la Parte 2.

---

## 1. Objetivo

El servidor `SERVER_DC` quedará como:

- **Controlador de Dominio (AD DS)** del dominio `dominio.com`.
- **Servidor DNS** que resuelve los nombres del dominio.
- **Servidor DHCP** que reparte IPs a los clientes de la red interna `192.168.1.0/24`.

### ¿Para qué unir clientes al dominio si aún no hay reglas?

- **Autenticación centralizada:** una sola cuenta por usuario, válida en todos los equipos. Si se cambia la contraseña en el DC, cambia para todos.
- **DNS interno:** los equipos se registran solos y se localizan por nombre (p. ej. `equipo1.dominio.com`).
- **Control de acceso:** permisos sobre carpetas e impresoras basados en grupos de AD.
- **Base para las GPO:** sin equipos unidos al dominio no se les puede aplicar ninguna directiva.

---

## 2. Esquema de la arquitectura

El servidor tiene **dos tarjetas de red**: una hacia la NAT de VirtualBox (salida a Internet) y otra hacia la red interna aislada, donde viven los clientes del dominio.

![Esquema de la red y de la estructura de Active Directory](/img/guias/ad-parte1/image1.png)

Al arrancar Server Core no hay escritorio: solo una consola. Todo el trabajo se hace desde ahí.

![Pantalla de inicio de Windows Server Core](/img/guias/ad-parte1/image2.png)

| Elemento | Valor |
|----------|-------|
| Hipervisor | Oracle VirtualBox |
| Máquina virtual | `SERVER_DC` |
| Sistema operativo | Windows Server 2022 Core (sin GUI) |
| Adaptador 1 (`Ethernet`) | NAT · IP dinámica · salida a Internet |
| Adaptador 2 (`Ethernet 2`) | Red de laboratorio · IP estática |
| IP del DC | `192.168.1.10/24` (255.255.255.0) |
| Puerta de enlace | Ninguna (red aislada) |
| DNS del DC | `127.0.0.1` (se consulta a sí mismo) |
| Dominio / bosque | `dominio.com` |
| Ámbito DHCP | `192.168.1.50 – 192.168.1.200` |

---

## 3. Paso 1 — Preparar las tarjetas de red

### 3.1 En VirtualBox

Con la VM apagada, en **Settings → Network** se deja el **Adaptador 1 en NAT** y se habilita el **Adaptador 2**. Inicialmente aparece como *Not attached*:

![Adaptador 2 habilitado pero sin conectar](/img/guias/ad-parte1/image3.png)

Se conecta a la red del laboratorio. Aquí se eligió **Host-only Adapter**:

![Adaptador 2 conectado como Host-only Adapter](/img/guias/ad-parte1/image4.png)

> **Importante:** el servidor y todos los clientes deben estar en **exactamente la misma red** de VirtualBox (el mismo Host-only o la misma Red interna, p. ej. `intnet`). Si no, los clientes nunca verán el DHCP ni el dominio.

### 3.2 Identificar los adaptadores en Windows

```powershell
Get-NetAdapter
```

![Salida de Get-NetAdapter: Ethernet y Ethernet 2](/img/guias/ad-parte1/image5.png)

La MAC de **Ethernet 2** (`08-00-27-9E-9F-D3`) coincide con la del Adaptador 2 en VirtualBox (`0800279E9FD3`). Por tanto, todos los comandos de red se aplican a **Ethernet 2**, no a `Ethernet` (que es la NAT y no se toca).

---

## 4. Paso 2 — IP estática y DNS

Un Controlador de Dominio **nunca debe tener IP dinámica**: el resto de equipos necesita encontrarlo siempre en la misma dirección. Antes del cambio, Ethernet 2 tenía una IP `169.254.x.x` (APIPA), señal de que no había ningún DHCP en esa red.

### 4.1 Asignar la IP estática

```powershell
New-NetIPAddress -InterfaceAlias "Ethernet 2" -IPAddress 192.168.1.10 -PrefixLength 24
```

- `-InterfaceAlias`: tarjeta sobre la que se actúa.
- `-IPAddress`: IP fija del servidor.
- `-PrefixLength 24`: máscara `255.255.255.0`.
- Se omite `-DefaultGateway` a propósito: la red interna no necesita salir a Internet.

![IP 192.168.1.10/24 asignada a Ethernet 2 (PrefixOrigin: Manual)](/img/guias/ad-parte1/image6.png)

### 4.2 Configurar el DNS

```powershell
Set-DnsClientServerAddress -InterfaceAlias "Ethernet 2" -ServerAddresses 127.0.0.1
Get-DnsClientServerAddress -InterfaceAlias "Ethernet 2"
```

![DNS de Ethernet 2 apuntando a 127.0.0.1](/img/guias/ad-parte1/image7.png)

**¿Por qué `127.0.0.1`?**

- El propio servidor va a ser el **servidor DNS del dominio**, así que debe preguntarse a sí mismo para resolver `dominio.com`.
- La red está aislada: apuntar a un DNS público (`8.8.8.8`) haría que las consultas del dominio fallasen.
- `127.0.0.1` (loopback) sigue funcionando aunque en el futuro cambie la IP. Usar su propia IP (`192.168.1.10`) también es válido y es lo que suele recomendar Microsoft.

> **¿Hay que tocar la NAT?** No. La configuración solo afecta a Ethernet 2. El Adaptador 1 (NAT) se queda con DHCP para que la VM pueda descargar actualizaciones.

---

## 5. Paso 3 — Instalar los roles AD DS y DHCP

Los roles vienen deshabilitados por defecto. Se instalan con un único comando:

```powershell
Install-WindowsFeature AD-Domain-Services, DHCP -IncludeManagementTools
```

> **Error encontrado:** al escribir el parámetro con erratas (`-InlcudeManagmentTools`) PowerShell responde *A parameter cannot be found that matches parameter name*. La forma correcta es `-IncludeManagementTools`. Para salir del paso se ejecutó la versión sin parámetro, que instala los roles igualmente:
>
> ```powershell
> Install-WindowsFeature AD-Domain-Services, DHCP
> ```

![Instalación correcta: Success = True, Exit Code = Success](/img/guias/ad-parte1/image8.png)

Comprobación (la columna **Install State** debe mostrar *Installed*):

```powershell
Get-WindowsFeature AD-Domain-Services, DHCP
```

---

## 6. Paso 4 — Promover el servidor a Controlador de Dominio

Este es el comando central: crea un **bosque nuevo** con el dominio `dominio.com`, instala el DNS y convierte el servidor en DC.

```powershell
$password = Read-Host -AsSecureString "Contraseña DSRM"
Install-ADDSForest -DomainName "dominio.com" -InstallDns:$true `
    -SafeModeAdministratorPassword $password -Force:$true
```

| Parámetro | Función |
|-----------|---------|
| `-DomainName` | Nombre raíz del bosque y del dominio. |
| `-InstallDns:$true` | Instala el servidor DNS; AD no funciona sin DNS. |
| `-SafeModeAdministratorPassword` | Contraseña del modo de restauración (DSRM), como SecureString. |
| `-Force:$true` | Omite confirmaciones y advertencias no críticas. |

> **Error encontrado:** la primera vez la contraseña DSRM no cumplía la política de complejidad. Debe combinar mayúsculas, minúsculas, números y símbolos (p. ej. `P@ssw0rd2026!`). Pasarla con `Read-Host -AsSecureString` evita que se vea en pantalla.

### 6.1 Advertencias durante la promoción

Aparecen tres avisos. **Ninguno bloquea el proceso:**

| Advertencia | Motivo | ¿Afecta? |
|-------------|--------|----------|
| Criptografía compatible con Windows NT 4.0 | Server 2022 bloquea algoritmos antiguos por seguridad. | No: no hay equipos NT 4.0. |
| Adaptador sin IP estática | Se refiere al Adaptador 1 (NAT), que sigue en DHCP. | No: el que importa (Ethernet 2) es estático. |
| No se puede crear una delegación DNS | Es el primer dominio del bosque; no hay zona padre. | No: el propio aviso dice que no requiere acción. |

Al terminar, el servidor **se reinicia solo**. Al volver a iniciar sesión, el usuario pasa a ser `DOMINIO\Administrator`, lo que confirma que el dominio existe.

---

## 7. Paso 5 — Autorizar el DHCP y crear el ámbito

### 7.1 Autorizar el servidor DHCP en AD

Por seguridad, un DHCP en un dominio **no reparte IPs hasta que se autoriza** en Active Directory. Así se evitan servidores DHCP falsos en la red.

```powershell
Add-DhcpServerInDC -DnsName $env:COMPUTERNAME -IPAddress 192.168.1.10
```

- `$env:COMPUTERNAME`: variable que toma automáticamente el nombre del equipo.
- `-IPAddress`: IP estática del servidor DHCP.

![Intentos con el nombre mal escrito y el comando correcto, que termina sin errores](/img/guias/ad-parte1/image9.png)

Comprobación:

```powershell
Get-DhcpServerInDC
```

### 7.2 Crear el ámbito (scope)

Define el rango de IPs que se entregará a los clientes:

```powershell
Add-DhcpServerv4Scope -Name "RedInterna-Scope" -StartRange 192.168.1.50 `
    -EndRange 192.168.1.200 -SubnetMask 255.255.255.0 -State Active
```

![Creación del ámbito RedInterna-Scope (192.168.1.50 – 192.168.1.200)](/img/guias/ad-parte1/image10.png)

```powershell
Get-DhcpServerv4Scope
```

### 7.3 Opciones del ámbito (recomendado)

Para que los clientes reciban automáticamente el DNS del dominio:

```powershell
Set-DhcpServerv4OptionValue -ComputerName $env:COMPUTERNAME `
    -DnsServer 192.168.1.10 -DnsDomain dominio.com
```

> **Nota:** no se configura `-Router` porque la red no tiene puerta de enlace. Si en el futuro se añade un router o firewall, se indicaría aquí su IP.

---

## 8. Paso 6 — Unir el primer cliente al dominio

Con el servidor listo, se prueba con una VM **Windows 10/11 Pro** o superior (la edición *Home* no puede unirse a un dominio).

- **Red:** en VirtualBox, conectar su adaptador a la **misma red** que el Adaptador 2 del servidor.
- **IP:** en el cliente, `ipconfig` debe mostrar una IP entre `192.168.1.50` y `192.168.1.200`.
- **DNS:** el DNS del cliente debe ser `192.168.1.10`. Comprobar con `nslookup dominio.com` (debe responder `192.168.1.10`).
- **Unión:** *Propiedades del sistema → Cambiar → Miembro de: Dominio* `dominio.com`, con credenciales de Administrator. O por PowerShell.

![Unión del cliente al dominio](/img/guias/ad-parte1/image11.png)
![Unión del cliente al dominio](/img/guias/ad-parte1/image12.png)

```powershell
Add-Computer -DomainName "dominio.com" -Credential DOMINIO\Administrator -Restart
```

- **Inicio de sesión:** tras reiniciar, entrar como `DOMINIO\Administrator` (u otro usuario del dominio).

Desde el servidor se puede comprobar que el equipo aparece en AD:

```powershell
Get-ADComputer -Filter *
```

---

## 9. Resumen de comandos

| # | Comando | Qué hace |
|---|---------|----------|
| 1 | `Get-NetAdapter` | Lista las tarjetas de red. |
| 2 | `New-NetIPAddress` | Asigna la IP estática a Ethernet 2. |
| 3 | `Set-DnsClientServerAddress` | Apunta el DNS a `127.0.0.1`. |
| 4 | `Install-WindowsFeature` | Instala los roles AD DS y DHCP. |
| 5 | `Get-WindowsFeature` | Verifica que los roles están instalados. |
| 6 | `Install-ADDSForest` | Crea el bosque `dominio.com` y promueve a DC. |
| 7 | `Add-DhcpServerInDC` | Autoriza el DHCP en Active Directory. |
| 8 | `Add-DhcpServerv4Scope` | Crea el rango de IPs para clientes. |
| 9 | `Set-DhcpServerv4OptionValue` | Entrega el DNS del dominio a los clientes. |
| 10 | `Add-Computer` | Une un cliente al dominio (desde el cliente). |

---

## 10. Problemas encontrados y solución

| Problema | Causa | Solución |
|----------|-------|----------|
| *A parameter cannot be found…* al instalar roles | Errata en `-IncludeManagementTools` | Escribir bien el parámetro u omitirlo. |
| Error de contraseña en `Install-ADDSForest` | La contraseña DSRM no cumplía la complejidad | Contraseña con mayúsculas, minúsculas, números y símbolos, vía `Read-Host -AsSecureString`. |
| *The term … is not recognized* | Nombre del cmdlet incompleto (`ServerInDc`) | Usar `Add-DhcpServerInDC`. |
| Ethernet 2 con IP `169.254.x.x` | No había DHCP en la red (APIPA) | Asignar IP estática con `New-NetIPAddress`. |

---

## 11. Próximos pasos (Parte 2)

Con la infraestructura base funcionando, la siguiente fase es replicar una red corporativa con **Políticas de Grupo**, también desde la línea de comandos:

- Crear **Unidades Organizativas** (`New-ADOrganizationalUnit`) para Equipos y Usuarios.
- Crear usuarios y grupos de prueba (`New-ADUser`, `New-ADGroup`).
- Crear y vincular **GPO** (`New-GPO`, `New-GPLink`, `Set-GPRegistryValue`).
- Aplicar y verificar en el cliente con `gpupdate /force` y `gpresult /r`.
