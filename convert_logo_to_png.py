#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
Script de conversion SVG vers PNG haute qualité
Convertit les logos SVG en plusieurs résolutions PNG optimales
"""

import cairosvg
from pathlib import Path
import sys

# Résolutions à générer (largeur en pixels)
resolutions = {
    "small": 200,      # Taille originale
    "medium": 400,     # 2x pour écrans HD
    "large": 800,      # 4x pour impression
    "xlarge": 1600,    # 8x pour haute résolution
}

def convert_svg_to_png(svg_file, output_file, scale=1.0):
    """
    Convertit un fichier SVG en PNG avec une qualité optimale
    
    Args:
        svg_file: Chemin du fichier SVG source
        output_file: Chemin du fichier PNG de sortie
        scale: Facteur d'échelle (1.0 = taille originale)
    """
    try:
        with open(svg_file, 'r', encoding='utf-8') as f:
            svg_content = f.read()
        
        # Conversion avec cairosvg (qualité optimale)
        cairosvg.svg2png(
            bytestring=svg_content.encode('utf-8'),
            write_to=str(output_file),
            scale=scale,
            dpi=300  # 300 DPI pour qualité impression
        )
        
        print(f"✅ Créé: {output_file.name} (échelle {scale}x)")
        return True
        
    except Exception as e:
        print(f"❌ Erreur lors de la conversion: {e}")
        return False

def convert_logo(svg_filename, source_folder="images"):
    """Convertit un logo SVG en plusieurs résolutions PNG"""
    svg_path = Path(source_folder) / svg_filename
    
    if not svg_path.exists():
        print(f"❌ Erreur: Le fichier {svg_path} n'existe pas!")
        return 0
    
    print(f"📁 Fichier source: {svg_path}")
    
    # Nom de base sans extension
    base_name = svg_path.stem
    
    # Créer le dossier de sortie si nécessaire
    output_dir = Path(source_folder)
    output_dir.mkdir(exist_ok=True)
    
    # Convertir en différentes résolutions
    success_count = 0
    for name, width in resolutions.items():
        # Calculer l'échelle (200px = taille originale du viewBox)
        scale = width / 200
        
        # Nom du fichier de sortie
        output_file = output_dir / f"{base_name}-{name}.png"
        
        # Convertir
        if convert_svg_to_png(svg_path, output_file, scale):
            success_count += 1
    
    print(f"✨ Conversion terminée: {success_count}/{len(resolutions)} fichiers créés\n")
    
    # Afficher les fichiers générés
    print("📊 Fichiers générés:")
    for name, width in resolutions.items():
        output_file = output_dir / f"{base_name}-{name}.png"
        if output_file.exists():
            size_kb = output_file.stat().st_size / 1024
            print(f"   • {output_file.name} ({width}x{width}px, {size_kb:.1f} KB)")
    
    return success_count

def main():
    """Fonction principale"""
    print("🎨 Conversion des logos SVG en PNG haute qualité\n")
    
    # Liste des logos à convertir
    logos = [
        "logo-autisme-senegal-v2-improved.svg",
        "logo-autisme-senegal-v2-baobab.svg",
        "logo-autisme-senegal-v2-improved-senegal.svg",
        "logo-autisme-senegal-v2-baobab-senegal.svg",
        "logo-autisme-senegal-moderne-1.svg",
        "logo-autisme-senegal-moderne-2.svg",
        "logo-autisme-senegal-moderne-3.svg",
        "logo-autisme-senegal-moderne-4.svg",
        "logo-autisme-senegal-moderne-5.svg",
        "logo-autisme-proposition-1.svg",
        "logo-autisme-proposition-2.svg",
        "logo-autisme-proposition-3.svg"
    ]
    
    total_success = 0
    
    # Logos dans images/
    logos_images = [
        "logo-autisme-senegal-v2-improved.svg",
        "logo-autisme-senegal-v2-baobab.svg",
        "logo-autisme-senegal-v2-improved-senegal.svg",
        "logo-autisme-senegal-v2-baobab-senegal.svg",
        "logo-autisme-senegal-moderne-1.svg",
        "logo-autisme-senegal-moderne-2.svg",
        "logo-autisme-senegal-moderne-3.svg",
        "logo-autisme-senegal-moderne-4.svg",
        "logo-autisme-senegal-moderne-5.svg"
    ]
    
    # Logos dans logos/
    logos_propositions = [
        "logo-autisme-proposition-1.svg",
        "logo-autisme-proposition-2.svg",
        "logo-autisme-proposition-3.svg",
        "logo-autisme-proposition-1-variant-a.svg",
        "logo-autisme-proposition-1-variant-b.svg",
        "logo-autisme-proposition-1-variant-c.svg"
    ]
    
    # Convertir les logos dans images/
    for logo in logos_images:
        print(f"\n{'='*60}")
        print(f"Conversion de: {logo}")
        print('='*60)
        total_success += convert_logo(logo, "images")
    
    # Convertir les propositions dans logos/
    for logo in logos_propositions:
        print(f"\n{'='*60}")
        print(f"Conversion de: {logo}")
        print('='*60)
        total_success += convert_logo(logo, "logos")
    
    print(f"\n{'='*60}")
    print(f"✨ TOTAL: {total_success} fichiers PNG créés avec succès!")
    print('='*60)

if __name__ == "__main__":
    main()
