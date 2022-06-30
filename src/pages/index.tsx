import type { NextPage } from "next";
import Link from "next/link";
import LoginForm from "../components/LoginForm";
import { useUserContext } from "../context/user.context";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const user = useUserContext();

  if (!user) {
    return <LoginForm />;
  }

  return (
    <div>
      <Link href="/posts/new">
        <a>Create Post</a>
      </Link>
    </div>
  );

  return <div className={styles.container}>{JSON.stringify(user)}</div>;
};

export default Home;
