import asyncio
import os
import subprocess
import edge_tts
from PIL import Image, ImageDraw, ImageFont
import imageio_ffmpeg

FFMPEG = imageio_ffmpeg.get_ffmpeg_exe()
VOICE = "es-MX-JorgeNeural"
BASE_DIR = "/home/sebastian/Documents/Repos/Final-Parnet"
SHOTS_DIR = os.path.join(BASE_DIR, "docs/screenshots")
PUBLIC_DIR = os.path.join(BASE_DIR, "frontend/public")
TMP_DIR = "/tmp/parnet_video_gen"
os.makedirs(TMP_DIR, exist_ok=True)

SCENES = [
    {
        "id": "scene1",
        "image": "01_home_inicio.png",
        "title": "PARNET INGENIERÍA · OBJETIVO Y ARQUITECTURA",
        "subtitle": "Rúbrica: Diseño Photoshop (3 pts) · Slider Dinámico (2 pts) · Monorepo Desacoplado",
        "text": (
            "Buen día profesor y compañeros. A nombre del equipo integrado por Frida, Job y Sebastian Chapa, "
            "presentamos el proyecto final integrador para la materia de Desarrollo Web: Parnet Ingeniería, "
            "implementado bajo una arquitectura desacoplada con React, Node.js y Programación Orientada a Objetos, "
            "cumpliendo con la restricción de no utilizar PHP. "
            "El objetivo principal de la plataforma es brindar una solución web integral para la empresa Parnet, "
            "permitiendo a clientes corporativos consultar soluciones de conectividad, voz y datos, y solicitar "
            "levantamientos técnicos en sitio. La interfaz reproduce fielmente el diseño en Photoshop, integrando un "
            "slider interactivo y la presentación de nuestras cuatro áreas de ingeniería."
        )
    },
    {
        "id": "scene2",
        "image": "05_clientes_alianzas.png",
        "title": "CALIDAD EN PROYECTOS Y CONSEJOS TÉCNICOS",
        "subtitle": "Rúbrica: Alianzas y Clientes (3 pts) · Normativas ANSI/TIA 568-C · Video & Audio",
        "text": (
            "Uno de los pilares de Parnet Ingeniería es el uso estricto de estándares de calidad en cada proyecto. "
            "Cada tendido e instalación de cableado estructurado se apega a las normativas internacionales "
            "ANSI/TIA 568-C y normativas oficiales mexicanas, garantizando enlaces certificados con pruebas de "
            "reflectometría óptica en fibra óptica. "
            "Como consejo técnico para nuestros clientes empresariales, recomendamos siempre el uso de cableado "
            "Categoría 6 o superior en canalizaciones aisladas contra interferencias electromagnéticas, así como "
            "sistemas ininterrumpibles UPS de doble conversión para proteger los centros de datos contra variaciones "
            "eléctricas. Nuestras alianzas estratégicas con fabricantes como Cisco, Panduit y CommScope nos permiten "
            "certificar infraestructuras de hasta quince años de vida útil."
        )
    },
    {
        "id": "scene3",
        "image": "02_productos_catalogo.png",
        "title": "CATÁLOGO DE PRODUCTOS Y FICHA TÉCNICA PDF",
        "subtitle": "Rúbrica: Búsqueda Reactiva (5 pts) · Imágenes (2 pts) · Ficha Técnica PDF (5 pts)",
        "text": (
            "En el catálogo público de productos, implementamos una estrategia de búsqueda reactiva por código, "
            "nombre o descripción, junto con filtros por categoría tecnológica. Cada producto cuenta con fotografía "
            "optimizada, precio y disponibilidad de inventario en existencia o agotado. "
            "Además, damos cumplimiento al requisito de generar la Ficha Técnica oficial en formato PDF directamente "
            "desde el servidor utilizando la librería PDFKit bajo Programación Orientada a Objetos. Con un solo clic, "
            "el cliente descarga el documento membretado con las especificaciones técnicas y certificaciones vigentes."
        )
    },
    {
        "id": "scene4",
        "image": "03_servicios_captcha.png",
        "title": "FORMULARIOS PÚBLICOS Y CONTROL CAPTCHA",
        "subtitle": "Rúbrica: Solicitud de Servicios (5 pts) · Sugerencias en Tabla Interna (5 pts) · Contacto (5 pts)",
        "text": (
            "Para la interacción con los usuarios, el portal integra dos formularios críticos protegidos por "
            "control antibot CAPTCHA autogenerado en el servidor. "
            "Primero, el formulario de Solicitud de Servicios por área técnica, que genera automáticamente un folio "
            "de seguimiento al persistirse en base de datos. "
            "Y segundo, el formulario de Sugerencias para la empresa, el cual no envía correos planos sino que "
            "almacena los comentarios directamente en una tabla interna del sistema relacional para su posterior "
            "auditoría y análisis administrativo."
        )
    },
    {
        "id": "scene5",
        "image": "07_admin_dashboard_graficos.png",
        "title": "ZONA PRIVADA, 2 DASHBOARDS Y CRUD DE PRODUCTOS",
        "subtitle": "Rúbrica: Auth JWT (5 pts) · 2 Dashboards Chart.js (5 pts) · CRUD Productos (5 pts) · Excel/PDF (5 pts)",
        "text": (
            "Accedemos a la zona privada de administración mediante autenticación protegida por tokens criptográficos "
            "JWT y contraseñas hasheadas con Bcrypt. "
            "En el Panel de Control se despliegan los dos dashboards con gráficos interactivos construidos con "
            "Chart.js: el primero analiza el volumen de solicitudes por área de servicio, y el segundo la distribución "
            "del catálogo por categoría tecnológica. "
            "En la sección de productos, el administrador dispone del CRUD completo para registrar, modificar, "
            "eliminar y gestionar existencias. Y en la sección de sugerencias, se ofrece visualización paginada con "
            "botones funcionales para exportar a hojas de cálculo Excel y documentos PDF estructurados. "
            "Toda la persistencia opera mediante el ORM Sequelize bajo el patrón de diseño Singleton."
        )
    },
    {
        "id": "scene6",
        "image": "08_admin_productos_crud.png",
        "title": "GESTIÓN DE STOCK, EXPORTACIÓN Y CONCLUSIÓN",
        "subtitle": "Rúbrica: Reporte Stock (5 pts) · Contador Visitas (2 pts) · Patrón Singleton (5 pts)",
        "text": (
            "En el mantenimiento de catálogo, podemos generar el reporte general de stock y verificar el estado "
            "del inventario en tiempo real. "
            "Asimismo, en el pie de página de todo el portal podemos constatar el contador en vivo de visitas "
            "acumuladas y usuarios conectados concurrentes. "
            "Con esto, Parnet Ingeniería cumple al cien por ciento con los requerimientos técnicos y funcionales "
            "establecidos en la rúbrica oficial. Muchas gracias por su atención."
        )
    }
]

AUDIO_CAPSULE_TEXT = (
    "Hola, bienvenido a Parnet Ingeniería, tu aliado en soluciones integrales de conectividad y redes empresariales. "
    "Recuerda que para evitar pérdidas de paquetes y garantizar la máxima velocidad en tu empresa, es fundamental "
    "contar con cableado estructurado certificado bajo la norma ANSI/TIA 568-C, así como protección eléctrica "
    "regulada para tus cuartos de telecomunicaciones. Si tu empresa requiere una auditoría técnica o tendido de "
    "fibra óptica, visita nuestra sección de Servicios y solicita un levantamiento con nuestros ingenieros certificados. "
    "En Parnet Ingeniería, conectamos tu infraestructura al futuro."
)

def get_audio_duration(file_path):
    cmd = [
        FFMPEG, "-i", file_path, "-f", "null", "-"
    ]
    res = subprocess.run(cmd, stderr=subprocess.PIPE, text=True)
    for line in res.stderr.split("\n"):
        if "Duration:" in line:
            parts = line.split("Duration:")[1].split(",")[0].strip().split(":")
            h, m, s = float(parts[0]), float(parts[1]), float(parts[2])
            return h * 3600 + m * 60 + s
    return 20.0

def create_slide_image(scene, out_path):
    width, height = 1920, 1080
    bg = Image.new("RGB", (width, height), (15, 23, 42)) # Slate 900
    draw = ImageDraw.Draw(bg)

    # Cargar screenshot
    src_img_path = os.path.join(SHOTS_DIR, scene["image"])
    if os.path.exists(src_img_path):
        src_img = Image.open(src_img_path).convert("RGB")
        # Escalar screenshot manteniendo aspect ratio para que quepa en 1600x820
        target_w, target_h = 1600, 820
        src_ratio = src_img.width / src_img.height
        target_ratio = target_w / target_h

        if src_ratio > target_ratio:
            new_w = target_w
            new_h = int(target_w / src_ratio)
        else:
            new_h = target_h
            new_w = int(target_h * src_ratio)

        resized = src_img.resize((new_w, new_h), Image.Resampling.LANCZOS)
        # Centrar screenshot
        pos_x = (width - new_w) // 2
        pos_y = 110 + (target_h - new_h) // 2
        bg.paste(resized, (pos_x, pos_y))

    # Barra superior institucional
    draw.rectangle([0, 0, width, 95], fill=(0, 43, 73)) # Navy Parnet
    draw.rectangle([0, 95, width, 100], fill=(2, 132, 199)) # Accent Blue

    # Barra inferior con títulos de rúbrica
    draw.rectangle([0, height - 95, width, height], fill=(0, 31, 53))
    draw.rectangle([0, height - 98, width, height - 95], fill=(2, 132, 199))

    # Textos
    try:
        font_title = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 36)
        font_sub = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 24)
        font_logo = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 40)
    except:
        font_title = font_sub = font_logo = None

    draw.text((50, 25), "PARNET INGENIERÍA", fill=(255, 255, 255), font=font_logo)
    draw.text((600, 30), scene["title"], fill=(224, 242, 254), font=font_title)
    draw.text((50, height - 65), scene["subtitle"], fill=(56, 189, 248), font=font_sub)

    bg.save(out_path, quality=95)

async def main():
    print("🚀 [1/4] Generando locución neural en español mexicano con Edge-TTS...")
    audio_files = []
    total_duration = 0

    for i, scene in enumerate(SCENES):
        audio_path = os.path.join(TMP_DIR, f"{scene['id']}.mp3")
        tts = edge_tts.Communicate(scene["text"], VOICE, rate="+3%")
        await tts.save(audio_path)
        dur = get_audio_duration(audio_path) + 0.8 # Padding natural
        audio_files.append((audio_path, dur))
        total_duration += dur
        print(f"  - Escena {i+1} ({scene['id']}): {dur:.1f} segundos")

    print(f"⏱️ Duración total estimada del video: {total_duration:.1f}s (~{int(total_duration//60)}:{int(total_duration%60):02d} min)")

    print("\n🎨 [2/4] Generando diapositivas visuales Full HD (1920x1080)...")
    clip_files = []
    for i, scene in enumerate(SCENES):
        img_path = os.path.join(TMP_DIR, f"{scene['id']}.jpg")
        create_slide_image(scene, img_path)
        
        audio_path, dur = audio_files[i]
        clip_path = os.path.join(TMP_DIR, f"clip_{scene['id']}.mp4")

        # Codificar clip individual con ffmpeg sincronizado con su audio
        cmd = [
            FFMPEG, "-y",
            "-loop", "1", "-i", img_path,
            "-i", audio_path,
            "-c:v", "libx264", "-tune", "stillimage", "-pix_fmt", "yuv420p",
            "-c:a", "aac", "-b:a", "192k",
            "-t", str(dur),
            "-shortest",
            clip_path
        ]
        subprocess.run(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        clip_files.append(clip_path)
        print(f"  - Clip renderizado: {clip_path}")

    print("\n🎬 [3/4] Concatenando clips finales en frontend/public/video_parnet.mp4...")
    concat_list_path = os.path.join(TMP_DIR, "concat_list.txt")
    with open(concat_list_path, "w") as f:
        for clip in clip_files:
            f.write(f"file '{clip}'\n")

    output_video = os.path.join(PUBLIC_DIR, "video_parnet.mp4")
    cmd_concat = [
        FFMPEG, "-y",
        "-f", "concat", "-safe", "0",
        "-i", concat_list_path,
        "-c", "copy",
        output_video
    ]
    subprocess.run(cmd_concat, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    final_dur = get_audio_duration(output_video)
    print(f"✅ Video generado exitosamente en: {output_video}")
    print(f"   Duración final: {final_dur:.1f}s (~{int(final_dur//60)}:{int(final_dur%60):02d} min)")

    print("\n🎙️ [4/4] Generando cápsula de audio oficial para frontend/public/audio_parnet.mp3...")
    output_audio = os.path.join(PUBLIC_DIR, "audio_parnet.mp3")
    tts_audio = edge_tts.Communicate(AUDIO_CAPSULE_TEXT, VOICE)
    await tts_audio.save(output_audio)
    audio_dur = get_audio_duration(output_audio)
    print(f"✅ Cápsula de audio generada en: {output_audio} ({audio_dur:.1f}s)")

if __name__ == "__main__":
    asyncio.run(main())

