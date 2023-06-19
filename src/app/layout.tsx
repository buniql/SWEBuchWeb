import { CssBaseline, Container } from '../components/mui'
import Navbar from './view_model/Navbar'
import { SearchProvider } from './SearchContext'


export const metadata = {
  title: 'Buch',
  description: 'SWE SS23 Projekt Buch',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <CssBaseline />
      <body>
        <SearchProvider>
        <Container sx={[{
          pt:  { xs: 9, sm: 11 }}]}>
            <Navbar/>
              <main>
                {children}
              </main>
        </Container>
        </SearchProvider>
      </body>
    </html>
  )
}
