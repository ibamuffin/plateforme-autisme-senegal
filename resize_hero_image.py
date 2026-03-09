#!/usr/bin/env python3
"""
Script pour redimensionner l'image SVG hero selon les dimensions CSS
Dimensions cibles: 380x285px (ratio 4:3)
"""

import re
import os
from pathlib import Path

def resize_svg_simple(input_file, output_file, target_width=380, target_height=285):
    """
    Redimensionne un fichier SVG en modifiant directement les attributs width et height
    
    Args:
        input_file (str): Chemin vers le fichier SVG source
        output_file (str): Chemin vers le fichier SVG de sortie
        target_width (int): Largeur cible en pixels
        target_height (int): Hauteur cible en pixels
    """
    # Lire le fichier SVG
    with open(input_file, 'r', encoding='utf-8') as f:
        svg_content = f.read()
    
    # Extraire les dimensions originales
    width_match = re.search(r'<svg[^>]*width="(\d+)"', svg_content)
    height_match = re.search(r'<svg[^>]*height="(\d+)"', svg_content)
    viewbox_match = re.search(r'<svg[^>]*viewBox="([^"]+)"', svg_content)
    
    if width_match and height_match:
        original_width = width_match.group(1)
        original_height = height_match.group(1)
        print(f"📏 Dimensions originales:")
        print(f"   Width: {original_width}px")
        print(f"   Height: {original_height}px")
    else:
        print("⚠️ Impossible de trouver les dimensions originales")
        original_width = "inconnu"
        original_height = "inconnu"
    
    if viewbox_match:
        original_viewbox = viewbox_match.group(1)
        print(f"   ViewBox: {original_viewbox}")
    else:
        print("   ViewBox: non défini")
        original_viewbox = None
    
    # Remplacer les attributs width et height dans la balise <svg>
    # Pattern pour capturer la balise svg complète
    svg_pattern = r'(<svg[^>]*?)width="[^"]*"([^>]*?)height="[^"]*"'
    
    # Nouvelle balise avec les dimensions mises à jour
    svg_replacement = rf'\1width="{target_width}"\2height="{target_height}"'
    
    # Appliquer le remplacement
    new_content = re.sub(svg_pattern, svg_replacement, svg_content)
    
    # Si le remplacement n'a pas fonctionné, essayer dans l'autre sens (height avant width)
    if new_content == svg_content:
        svg_pattern = r'(<svg[^>]*?)height="[^"]*"([^>]*?)width="[^"]*"'
        svg_replacement = rf'\1height="{target_height}"\2width="{target_width}"'
        new_content = re.sub(svg_pattern, svg_replacement, svg_content)
    
    print(f"\n📐 Nouvelles dimensions:")
    print(f"   Width: {target_width}px")
    print(f"   Height: {target_height}px")
    
    # Sauvegarder le fichier modifié
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    print(f"\n💾 Fichier sauvegardé: {output_file}")
    
    # Afficher les tailles de fichiers
    original_size = os.path.getsize(input_file)
    new_size = os.path.getsize(output_file)
    
    print(f"\n📊 Tailles de fichiers:")
    print(f"   Original: {original_size:,} bytes ({original_size/1024:.2f} KB)")
    print(f"   Nouveau: {new_size:,} bytes ({new_size/1024:.2f} KB)")
    
    if new_size < original_size:
        reduction = ((original_size - new_size) / original_size) * 100
        print(f"   🎉 Réduction: {reduction:.1f}%")
    elif new_size > original_size:
        increase = ((new_size - original_size) / original_size) * 100
        print(f"   ⚠️ Augmentation: {increase:.1f}%")
    else:
        print(f"   ➡️ Taille similaire")

def main():
    """Fonction principale"""
    print("=" * 60)
    print("🎨 Redimensionnement de l'image SVG hero")
    print("=" * 60)
    
    # Chemins des fichiers
    script_dir = Path(__file__).parent
    images_dir = script_dir / 'images'
    
    input_file = images_dir / 'enfants-autisme-accueil.svg'
    output_file = images_dir / 'enfants-autisme-accueil-optimized.svg'
    
    # Vérifier que le fichier source existe
    if not input_file.exists():
        print(f"❌ Erreur: Le fichier source n'existe pas: {input_file}")
        return
    
    print(f"\n📂 Fichier source: {input_file.name}")
    print(f"📂 Fichier destination: {output_file.name}")
    print(f"\n🎯 Dimensions cibles: 380x285px (ratio 4:3)")
    print(f"   (Basé sur le CSS: width: 380px; height: 285px;)\n")
    
    # Redimensionner
    try:
        resize_svg_simple(str(input_file), str(output_file), 380, 285)
        print("\n" + "=" * 60)
        print("✅ Redimensionnement terminé avec succès!")
        print("=" * 60)
        print(f"\n💡 Pour utiliser la nouvelle image, modifiez index.html:")
        print(f'   <img src="images/enfants-autisme-accueil-optimized.svg?v=2024-03-09"...')
        
    except Exception as e:
        print(f"\n❌ Erreur lors du redimensionnement: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    main()
