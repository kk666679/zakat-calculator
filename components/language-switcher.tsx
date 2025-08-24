"use client"

import { usePathname, useRouter } from 'next/navigation'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { locales } from '@/lib/i18n'

const languageNames = {
  en: { name: 'English', flag: '🇬🇧' },
  ar: { name: 'العربية', flag: '🇸🇦' },
  id: { name: 'Bahasa Indonesia', flag: '🇮🇩' },
  ms: { name: 'Bahasa Melayu', flag: '🇲🇾' },
  th: { name: 'ไทย', flag: '🇹🇭' },
  vi: { name: 'Tiếng Việt', flag: '🇻🇳' },
  tl: { name: 'Filipino', flag: '🇵🇭' },
  my: { name: 'မြန်မာစာ', flag: '🇲🇲' },
  km: { name: 'ខ្មែរ', flag: '🇰🇭' },
  lo: { name: 'ລາວ', flag: '🇱🇦' }
}

export function LanguageSwitcher() {
  const router = useRouter()
  const pathname = usePathname()

  const handleLocaleChange = (newLocale: string) => {
    // Get the current pathname segments
    const segments = pathname.split('/')
    
    // Replace the locale segment (should be the first one after the initial slash)
    segments[1] = newLocale
    
    // Reconstruct the path with the new locale
    const newPath = segments.join('/')
    
    router.push(newPath)
  }

  // Extract current locale from pathname
  const currentLocale = pathname.split('/')[1] || 'en'

  return (
    <Select value={currentLocale} onValueChange={handleLocaleChange}>
      <SelectTrigger className="w-[200px]">
        <SelectValue>
          {languageNames[currentLocale as keyof typeof languageNames]?.flag} {' '}
          {languageNames[currentLocale as keyof typeof languageNames]?.name}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {locales.map((locale) => (
          <SelectItem key={locale} value={locale}>
            {languageNames[locale as keyof typeof languageNames]?.flag} {' '}
            {languageNames[locale as keyof typeof languageNames]?.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
