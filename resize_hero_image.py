#!/usr/bin/env python3
"""
Script pour redimensionner l'image SVG hero selon les dimensions CSS
Dimensions cibles: 380x285px (ratio 4:3)
"""

import os
from pathlib import Path

def resize_svg_simple(input_file, output_file, target_width=380, target_height=285):
    """
    Redimensionne un fichier SVG en modifiant uniquement la première ligne
    
    Args:
        input_file (str): Chemin vers le fichier SVG source
        output_file (str): Chemin vers le fichier SVG de sortie
        target_width (int): Largeur cible en pixels
        target_height (int): Hauteur cible en pixels
    """
    # Lire tout le fichier
    with open(input_file, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    
    print(f"📏 Fichier original:")
    print(f"   Première ligne: {lines[0].strip()}")
    
    # Modifier uniquement la première ligne pour changer width et height
    if '<svg' in lines[0] and 'width=' in lines[0] and 'height=' in lines[0]:
        # Remplacer width="400" par width="380"
        new_line = lines[0].replace('width="400"', f'width="{target_width}"')
        # Remplacer height="300" par height="285"
        new_line = new_line.replace('height="300"', f'height="{target_height}"')
        lines[0] = new_line
        
        print(f"\n📐 Nouvelle première ligne:")
        print(f"   {new_line.strip()}")
    else:
        print("⚠️ Format SVG non reconnu, aucune modification effectuée")
        return False
    
    # Écrire le fichier modifié
    with open(output_file, 'w', encoding='utf-8') as f:
        f.writelines(lines)
    
    print(f"\n💾 Fichier sauvegardé: {output_file}")
    
    # Afficher les tailles de fichiers
    original_size = os.path.getsize(input_file)
    new_size = os.path.getsize(output_file)
    
    print(f"\n📊 Tailles de fichiers:")
    print(f"   Original: {original_size:,} bytes ({original_size/1024:.2f} KB)")
    print(f"   Nouveau: {new_size:,} bytes ({new_size/1024:.2f} KB)")
    
    return True

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
        success = resize_svg_simple(str(input_file), str(output_file), 380, 285)
        if success:
            print("\n" + "=" * 60)
            print("✅ Redimensionnement terminé avec succès!")
            print("=" * 60)
        else:
            print("\n❌ Le redimensionnement a échoué")
        
    except Exception as e:
        print(f"\n❌ Erreur lors du redimensionnement: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    main()
