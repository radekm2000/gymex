import { Link } from "wouter";
import { RoutePath } from "../../constants/navigation";

export const Sidebar = () => {
  return (
    <div className="h-full text-white border-r border-primary-light">
      <div className="block p-4">
        <Link href={RoutePath.MainPage}>
          <span className="block mb-2">main Page</span>
        </Link>
        <Link href={RoutePath.Test}>
          <span className="block mb-2">test Page</span>
        </Link>
        <Link href="/twojastararozwalamnie">
          <span className="block mb-2">default Page</span>
        </Link>
      </div>
    </div>
  );
};
