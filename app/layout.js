import './styles/global.css';
import './styles/custom.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/navbar/navbar';

export const metadata = {
  title: 'Cageflix',
  description: 'Explore Nicolas Cage films',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon"  />
      </head>
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}