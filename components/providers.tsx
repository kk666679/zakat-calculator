'use client'

import { NextIntlClientProvider, useMessages } from 'next-intl'
import { ThemeProvider } from '@/components/theme-provider'

export function Providers({ children, locale }: { children: React.ReactNode; locale: string }) {
  const messages = useMessages()
  
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {children}
      </ThemeProvider>
    </NextIntlClientProvider>
  )
}
