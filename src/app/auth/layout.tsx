import "../../css/style.css";
import "../../css/satoshi.css";
import "../../css/login.css";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
