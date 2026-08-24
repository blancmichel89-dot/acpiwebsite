import "./globals.css";

export const metadata = {
  title: "Nicobat — Rénovation intérieure & pose de cuisine",
  description: "Artisan du bâtiment à Chamvres — rénovation intérieure, pose de cuisine.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
