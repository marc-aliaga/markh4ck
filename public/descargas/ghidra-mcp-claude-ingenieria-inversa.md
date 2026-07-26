# Cómo conectar Ghidra con Claude para Ingeniería Inversa asistida por IA

*by Mark H4ck

## Índice

1. [Entendiendo MCP](#entendiendo-mcp)
2. [Instalación de Ghidra](#instalación-de-ghidra)
3. [Instalación de Claude Code (CLI)](#instalación-de-claude-code-cli)
4. [Configurando el entorno GhidraMCP](#configurando-el-entorno-ghidramcp)
5. [Prueba de concepto (POC)](#prueba-de-concepto-poc)
6. [Conclusiones](#conclusiones)

## Entendiendo MCP

El **Model Context Protocol (MCP)** es un estándar que permite a modelos de IA grandes (como Claude o GPT) comunicarse con herramientas externas y fuentes de datos mediante una interfaz común. Un servidor MCP funciona como un "puente" que le permite a tu asistente de IA hablar con herramientas como Ghidra, haciendo la interacción entre ambos más clara y segura.

No hace falta ser un experto en MCP, solo entender lo suficiente para comprender cómo funciona ese puente entre las herramientas y Claude.

## Instalación de Ghidra

Antes de poder conectar nada, necesitas Ghidra instalado. La fuente oficial es el repositorio de la NSA en GitHub:

Repositorio: [NationalSecurityAgency/ghidra en GitHub](https://github.com/NationalSecurityAgency/ghidra)

### Requisitos previos

- **JDK 21 (64-bit)**. Ghidra necesita un JDK compatible instalado (no solo un JRE). Se recomienda [Eclipse Temurin](https://adoptium.net/) si no tienes uno ya.
- Sistema operativo de 64 bits (Windows, Linux o macOS).

### Pasos para instalar (release oficial, recomendado)

**1. Descargar el release estable**

- Entra al repositorio y ve a la pestaña `Releases` (o directamente [ghidra_docs Releases](https://github.com/NationalSecurityAgency/ghidra/releases)).
- Descarga el `.zip` de la última versión estable (algo como `ghidra_X.X.X_PUBLIC_YYYYMMDD.zip`). No hace falta compilar nada, este paquete ya viene compilado.

**2. Extraer el paquete**

- Descomprime el `.zip` en una carpeta sin espacios ni caracteres raros en la ruta (ej. `C:\ghidra\` en Windows o `~/ghidra/` en Linux/macOS).

**3. Ejecutar Ghidra**

- Windows: doble clic en `ghidraRun.bat`
- Linux/macOS: desde una terminal, dentro de la carpeta extraída, ejecuta:

```bash
./ghidraRun
```

**4. Primer arranque**

- La primera vez tarda un poco más porque Ghidra indexa y prepara su entorno.
- Acepta el acuerdo de licencia si te lo pide y ya tendrás la interfaz principal (Project Manager) lista para crear tu primer proyecto.

> Nota: si prefieres compilar Ghidra desde el código fuente (por ejemplo para usar una versión de desarrollo), el propio repositorio incluye la guía `DevGuide.md` con los pasos para hacerlo vía Gradle. Para el 99% de los casos, usar el release precompilado del paso 1 es lo más rápido y estable.

## Instalación de Claude Code (CLI)

Además de Claude Desktop (que usamos más abajo para configurar el servidor MCP), puedes instalar **Claude Code** directamente desde la consola. Es el cliente de línea de comandos oficial de Anthropic y también soporta servidores MCP como GhidraMCP.

### Requisitos previos

- [Node.js](https://nodejs.org/) 18 o superior instalado (`node -v` para comprobarlo).

### Instalación

Desde una terminal (Windows, macOS o Linux):

```bash
npm install -g @anthropic-ai/claude-code
```

### Primer uso

1. Entra a la carpeta de tu proyecto (o del reto/binario que quieras analizar):

```bash
cd ruta/a/tu/proyecto
```

2. Arranca Claude Code:

```bash
claude
```

3. La primera vez te pedirá autenticarte (a través del navegador con tu cuenta de Anthropic/Claude, o con una API key si prefieres ese método).

Una vez autenticado, puedes registrar el servidor GhidraMCP también en Claude Code (no solo en Claude Desktop) con:

```bash
claude mcp add ghidra -- python3 /TU_RUTA/bridge_mcp_ghidra.py --ghidra-server http://127.0.0.1:8080/
```

Esto añade el mismo puente que configuramos manualmente en el siguiente apartado, pero directamente desde consola.

## Configurando el entorno GhidraMCP

Cualquiera que use Ghidra sabe que, aunque es una herramienta muy potente para descompilar código, interpretar y renombrar funciones o variables puede consumir mucho tiempo. Conectar un modelo de IA vía MCP ayuda a aliviar esa carga cognitiva. La idea es que Claude pueda asistir en tareas como analizar el comportamiento de funciones o resumir segmentos de código, mientras el analista mantiene el control de las decisiones finales.

### Pasos para configurarlo:

**1. Descargar el paquete GhidraMCP (última versión)**

Repositorio: [GhidraMCP en GitHub](https://github.com/LaurieWired/GhidraMCP)

Descargar el `.zip` del proyecto.

**2. Instalar la extensión en Ghidra**

- Abrir Ghidra → `File` → `Install Extensions`
- Clic en el botón `+` para agregar una extensión
- Seleccionar el `.zip` descargado (extraído)
- Confirmar que GhidraMCP quedó instalado

**3. Habilitar Developer Mode**

- `File` → `Configure`
- Marcar la casilla de **Developer options**

Esto es necesario para que la extensión quede activa correctamente.

**4. Instalar el SDK del Model Context Protocol**

```bash
pip3 install "mcp[cli]"
```

Si falla, probar con:

```bash
pip3 install mcp
```

**5. Registrar el servidor MCP en la configuración de Claude**

En Claude Desktop: `File` → `Settings` → `Developer` → `Edit Config`

Editar el archivo `claude_desktop_config.json` y agregar la entrada del servidor GhidraMCP, apuntando al script puente (bridge):

```json
{
  "mcpServers": {
    "ghidra": {
      "command": "python3",
      "args": [
        "/TU_RUTA/bridge_mcp_ghidra.py",
        "--ghidra-server",
        "http://127.0.0.1:8080/"
      ]
    }
  }
}
```

Si la conexión entre Ghidra y Claude se establece correctamente, vas a ver el estado "running" al lado de "ghidra" en la configuración de Claude.

Reiniciá Claude después de guardar los cambios. Debería aparecer una nueva opción de servidor MCP para Ghidra. Podés probarlo pidiéndole a Claude que inspeccione las funciones de un binario simple y que ayude a nombrarlas o a razonar sobre su lógica.

## Prueba de concepto (POC)

Como experimento, se realizó una prueba con GhidraMCP y Claude usando un reto de [Resolviendo el crackme a mano](https://www.youtube.com/watch?v=q1gmcywiW3k)

[Link del crackme](https://www.root-me.org/en/Challenges/Cracking/ELF-ARM-Basic-Crackme)

### Flujo de trabajo:

1. **Importar el binario del reto a Ghidra.**
2. **Analizarlo** con el motor de análisis automático de Ghidra.
3. Una vez completado el análisis, pasar a Claude y comenzar a interactuar. Cuando Claude solicita permiso para usar una función/herramienta del servidor MCP, se puede elegir "permitir siempre" o autorizar cada vez.
4. Tras unos momentos, Claude entrega un análisis de cómo funciona el binario junto con un **script solucionador** (solver).
5. El script solucionador se ejecuta y se obtiene la flag real.
6. La flag se envía a la plataforma y se valida como correcta. ✅

## Conclusiones

Integrar Ghidra con Claude mediante GhidraMCP demuestra el potencial de la IA para potenciar los flujos de trabajo de ingeniería inversa. Más allá de resolver retos estilo CTF, este tipo de configuración puede ser útil en análisis de malware real: identificar rutinas ofuscadas, decodificar algoritmos de strings personalizados, mapear el uso sospechoso de APIs y resumir las capacidades potenciales de un atacante.

La validación humana sigue siendo esencial. La IA no reemplaza al analista, pero sí reduce las tareas repetitivas y acelera el triage inicial. Bien utilizado, Claude se convierte en un asistente analítico potente dentro de Ghidra: **no sustituye al ingeniero inverso, lo potencia**.

A medida que las herramientas de IA maduran, flujos de trabajo como este podrían convertirse en un componente estándar dentro de los entornos modernos de análisis de malware.

---

Otros links:

Ghidra: [https://github.com/NationalSecurityAgency/ghidra](https://github.com/NationalSecurityAgency/ghidra)
