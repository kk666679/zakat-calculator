# Social Media Content Generator for Zakat Calculator ASEAN
# Generates graphics and content for Instagram, Facebook, Twitter campaigns

from PIL import Image, ImageDraw, ImageFont
import json
import datetime

class SocialMediaGenerator:
    def __init__(self):
        self.colors = {
            'primary': '#006633',
            'secondary': '#FFD700', 
            'accent': '#8E1600',
            'light': '#f8f9fa',
            'dark': '#343a40'
        }
        
        self.countries = {
            'MYR': {'name': 'Malaysia', 'flag': '🇲🇾', 'nisab': 21500},
            'SGD': {'name': 'Singapore', 'flag': '🇸🇬', 'nisab': 7225},
            'IDR': {'name': 'Indonesia', 'flag': '🇮🇩', 'nisab': 14500000},
            'THB': {'name': 'Thailand', 'flag': '🇹🇭', 'nisab': 54000},
            'PHP': {'name': 'Philippines', 'flag': '🇵🇭', 'nisab': 128000}
        }

    def create_instagram_carousel(self):
        """Generate Instagram carousel slides"""
        slides = []
        
        # Slide 1: Main title
        slide1_content = {
            'title': 'Zakat Kripto: Kewajipan Baru Umat Islam Digital',
            'subtitle': 'Memenuhi tanggungjawab agama di era blockchain',
            'background': 'gradient_green',
            'elements': ['crypto_coins', 'gold_bars', 'mosque_silhouette']
        }
        slides.append(slide1_content)
        
        # Slide 2: How to calculate
        slide2_content = {
            'title': 'Cara Kira Zakat Kripto dalam 3 Langkah',
            'steps': [
                '1. Kira nilai aset kripto dalam mata wang tempatan',
                '2. Tolak hutang dari jumlah aset',
                '3. Jika melebihi nisab, bayar 2.5%'
            ],
            'background': 'white',
            'elements': ['calculator_icon', 'arrow_flow', 'percentage_badge']
        }
        slides.append(slide2_content)
        
        # Slide 3: ASEAN nisab comparison
        slide3_content = {
            'title': 'Nisab ASEAN 2024',
            'data': self.countries,
            'background': 'light_blue',
            'elements': ['country_flags', 'currency_symbols', 'gold_standard']
        }
        slides.append(slide3_content)
        
        # Slide 4: App preview
        slide4_content = {
            'title': 'Bayar Zakat Secara Digital',
            'features': [
                'Kalkulator automatik',
                'Bayar terus ke badan zakat',
                'Sijil digital',
                'Rekod transparan'
            ],
            'background': 'app_mockup',
            'elements': ['phone_mockup', 'qr_code', 'blockchain_icons']
        }
        slides.append(slide4_content)
        
        # Slide 5: Call to action
        slide5_content = {
            'title': 'Kira Sekarang',
            'cta': 'Imbas QR code untuk mula mengira zakat kripto anda',
            'background': 'gradient_gold',
            'elements': ['large_qr_code', 'download_buttons', 'social_proof']
        }
        slides.append(slide5_content)
        
        return slides

    def generate_facebook_video_script(self):
        """Generate Facebook video ad script with timing"""
        script = {
            'duration': 30,
            'scenes': [
                {
                    'time': '0-3s',
                    'visual': 'Animation: Gold bars transforming into cryptocurrency coins',
                    'audio': 'Upbeat Islamic nasheed background music',
                    'text_overlay': None
                },
                {
                    'time': '3-6s', 
                    'visual': 'Text animation with Islamic geometric patterns',
                    'audio': 'Music continues',
                    'text_overlay': 'Ada Aset Kripto? Wajib Zakat!'
                },
                {
                    'time': '6-12s',
                    'visual': 'Host speaking (Malaysian Muslim influencer)',
                    'audio': 'Host explains: "Seperti emas, aset kripto juga wajib dizakatkan jika cukup syarat"',
                    'text_overlay': 'Fatwa JAKIM: WAJIB jika cukup syarat'
                },
                {
                    'time': '12-18s',
                    'visual': 'App demo: Calculator interface with MYR input',
                    'audio': 'Host continues: "Guna kalkulator digital untuk kira dengan tepat"',
                    'text_overlay': 'Nisab Malaysia: RM 21,500'
                },
                {
                    'time': '18-24s',
                    'visual': 'Payment flow demonstration',
                    'audio': 'Host: "Bayar terus melalui dompet digital anda"',
                    'text_overlay': 'Bayar kepada JAKIM, MAIWP, LZS'
                },
                {
                    'time': '24-30s',
                    'visual': 'QR code with download buttons',
                    'audio': 'Host: "Download sekarang dan tunaikan kewajipan anda"',
                    'text_overlay': 'Download App Sekarang'
                }
            ],
            'call_to_action': 'Learn More / Download App',
            'target_audience': 'Malaysian Muslims aged 25-45 interested in cryptocurrency'
        }
        return script

    def create_twitter_thread(self):
        """Generate Twitter thread content"""
        thread = [
            {
                'tweet': 1,
                'content': 'Thread 🧵: Panduan Zakat Kripto untuk Rakyat Malaysia 🇲🇾\n\nApakah anda tahu bahawa aset kripto juga wajib dizakatkan? Mari kita pelajari bersama! 👇\n\n#ZakatDigital #FintechIslam #KriptoHalal',
                'media': 'thread_header_image.jpg'
            },
            {
                'tweet': 2,
                'content': '1/6: Apakah Zakat Kripto?\n\n✅ Kewajipan baru di era digital\n✅ Fatwa JAKIM: WAJIB jika cukup syarat\n✅ Sama seperti zakat emas dan perak\n✅ Kadar: 2.5% dari nilai bersih\n\n#ZakatKripto #JAKIM',
                'media': 'crypto_zakat_infographic.jpg'
            },
            {
                'tweet': 3,
                'content': '2/6: Syarat Wajib Zakat Kripto:\n\n✓ Milik penuh aset (bukan pinjaman)\n✓ Melebihi nisab (RM21,500 untuk Malaysia)\n✓ Cukup haul (354 hari)\n✓ Aset berkembang/berpotensi tumbuh\n\n#SyaratZakat #KriptoHalal',
                'media': 'zakat_conditions_chart.jpg'
            },
            {
                'tweet': 4,
                'content': '3/6: Cara Pengiraan Mudah:\n\n📊 Formula: (Aset Kripto - Hutang) × 2.5%\n\n💡 Contoh:\n• Aset: RM30,000\n• Hutang: RM5,000  \n• Bersih: RM25,000\n• Zakat: RM25,000 × 0.025 = RM625\n\n#PengiraanZakat #ContohMudah',
                'media': 'calculation_example.jpg'
            },
            {
                'tweet': 5,
                'content': '4/6: Badan Zakat Rasmi Malaysia:\n\n🏛️ @MAIWPgov - Wilayah Persekutuan\n🏛️ @PPZMAIWP - Selangor\n🏛️ @LZS_Negeri9 - Negeri Sembilan\n\n✅ Semua disahkan halal\n🔗 Link pembayaran di bio\n\n#BadanZakat #ZakatMalaysia',
                'media': 'official_zakat_bodies.jpg'
            },
            {
                'tweet': 6,
                'content': '5/6: Teknologi Blockchain untuk Ketelusan:\n\n🔗 Setiap transaksi direkod\n📊 Agihan tepat ke 8 asnaf\n📜 Sijil zakat digital\n🔍 Audit mudah dan telus\n\n#BlockchainZakat #Transparency #TechIslam',
                'media': 'blockchain_transparency.jpg'
            },
            {
                'tweet': 7,
                'content': '6/6: Kalkulator Digital Percuma! 🆓\n\n📱 Kira zakat anda sekarang\n⚡ Hasil segera\n💳 Bayar terus online\n📄 Sijil automatik\n\n👉 zakatcalculator.asean\n\nRT untuk bantu kawan-kawan! 🔄\n\n#ZakatCalculator #DigitalZakat',
                'media': 'app_qr_code.jpg'
            }
        ]
        return thread

    def create_mosque_poster_design(self):
        """Design specifications for mosque posters"""
        poster_specs = {
            'size': 'A3 (297x420mm)',
            'orientation': 'Portrait',
            'resolution': '300 DPI',
            'color_mode': 'CMYK',
            'design_elements': {
                'header': {
                    'text': 'Bayar Zakat Kripto Anda',
                    'subtitle': 'Kewajipan Moden Umat Islam',
                    'font': 'Arabic/Malay calligraphy style',
                    'color': self.colors['primary'],
                    'position': 'top_center'
                },
                'main_content': {
                    'flowchart': {
                        'steps': [
                            'Kira Nilai Aset Kripto',
                            'Tolak Hutang Semasa', 
                            'Bandingkan dengan Nisab',
                            'Bayar 2.5% jika Wajib'
                        ],
                        'style': 'Islamic geometric pattern background'
                    },
                    'nisab_info': {
                        'malaysia': 'RM 21,500 (85g emas)',
                        'update_note': 'Dikemaskini bulanan'
                    }
                },
                'qr_code': {
                    'size': '80x80mm',
                    'position': 'bottom_center',
                    'url': 'https://zakatcalculator.asean',
                    'label': 'Imbas untuk Kalkulator Digital'
                },
                'footer': {
                    'text': 'Disokong oleh JAKIM dan Badan Zakat Negeri',
                    'logos': ['JAKIM', 'MAIWP', 'LZS'],
                    'contact': 'Untuk maklumat lanjut: zakat@islam.gov.my'
                },
                'decorative_elements': [
                    'Islamic geometric borders',
                    'Mosque silhouette',
                    'Crescent and star motifs',
                    'Arabic calligraphy accents'
                ]
            },
            'color_scheme': {
                'primary': self.colors['primary'],
                'secondary': self.colors['secondary'],
                'text': self.colors['dark'],
                'background': '#FFFFFF'
            }
        }
        return poster_specs

    def generate_campaign_analytics(self):
        """Generate analytics tracking for social media campaigns"""
        analytics_config = {
            'platforms': {
                'instagram': {
                    'metrics': ['reach', 'impressions', 'engagement_rate', 'saves', 'shares'],
                    'goals': {
                        'reach': 100000,
                        'engagement_rate': 0.05,
                        'app_downloads': 5000
                    },
                    'hashtags': [
                        '#ZakatKripto', '#ZakatDigital', '#FintechIslam', 
                        '#KriptoHalal', '#JAKIM', '#ZakatMalaysia'
                    ]
                },
                'facebook': {
                    'metrics': ['video_views', 'click_through_rate', 'cost_per_click', 'conversions'],
                    'goals': {
                        'video_views': 500000,
                        'click_through_rate': 0.02,
                        'app_downloads': 8000
                    },
                    'target_audience': {
                        'age': '25-55',
                        'location': 'Malaysia, Singapore, Indonesia, Thailand, Philippines',
                        'interests': ['Islam', 'Cryptocurrency', 'Finance', 'Technology'],
                        'behaviors': ['Crypto investors', 'Religious practices']
                    }
                },
                'twitter': {
                    'metrics': ['impressions', 'retweets', 'replies', 'link_clicks'],
                    'goals': {
                        'thread_views': 50000,
                        'retweets': 1000,
                        'website_visits': 3000
                    }
                }
            },
            'tracking_urls': {
                'instagram': 'zakatcalculator.asean?utm_source=instagram&utm_campaign=zakat2024',
                'facebook': 'zakatcalculator.asean?utm_source=facebook&utm_campaign=zakat2024',
                'twitter': 'zakatcalculator.asean?utm_source=twitter&utm_campaign=zakat2024'
            }
        }
        return analytics_config

    def export_campaign_package(self):
        """Export complete campaign package"""
        campaign_package = {
            'instagram_carousel': self.create_instagram_carousel(),
            'facebook_video_script': self.generate_facebook_video_script(),
            'twitter_thread': self.create_twitter_thread(),
            'mosque_poster_specs': self.create_mosque_poster_design(),
            'analytics_config': self.generate_campaign_analytics(),
            'created_date': datetime.datetime.now().isoformat(),
            'campaign_duration': '30 days',
            'budget_recommendation': {
                'instagram': 'RM 5,000',
                'facebook': 'RM 8,000', 
                'twitter': 'RM 2,000',
                'total': 'RM 15,000'
            }
        }
        
        return campaign_package

# Generate and display the campaign package
generator = SocialMediaGenerator()
campaign = generator.export_campaign_package()

print("=== ZAKAT CALCULATOR ASEAN - SOCIAL MEDIA CAMPAIGN PACKAGE ===\n")

print("📱 INSTAGRAM CAROUSEL:")
for i, slide in enumerate(campaign['instagram_carousel'], 1):
    print(f"Slide {i}: {slide['title']}")
    if 'steps' in slide:
        for step in slide['steps']:
            print(f"  • {step}")
    print()

print("🎥 FACEBOOK VIDEO SCRIPT:")
for scene in campaign['facebook_video_script']['scenes']:
    print(f"{scene['time']}: {scene['visual']}")
    if scene['text_overlay']:
        print(f"  Text: {scene['text_overlay']}")
    print()

print("🐦 TWITTER THREAD:")
for tweet in campaign['twitter_thread']:
    print(f"Tweet {tweet['tweet']}: {tweet['content'][:100]}...")
    print()

print("🏛️ MOSQUE POSTER SPECIFICATIONS:")
poster = campaign['mosque_poster_specs']
print(f"Size: {poster['size']}")
print(f"Header: {poster['design_elements']['header']['text']}")
print(f"QR Code: {poster['design_elements']['qr_code']['label']}")
print()

print("📊 CAMPAIGN ANALYTICS GOALS:")
analytics = campaign['analytics_config']
for platform, config in analytics['platforms'].items():
    print(f"{platform.upper()}:")
    for goal, target in config['goals'].items():
        print(f"  • {goal}: {target}")
    print()

print("💰 BUDGET RECOMMENDATION:")
budget = campaign['budget_recommendation']
for platform, amount in budget.items():
    print(f"  • {platform}: {amount}")

print(f"\n📅 Campaign Duration: {campaign['campaign_duration']}")
print("✅ Campaign package generated successfully!")
