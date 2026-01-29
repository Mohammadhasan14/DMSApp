import { Redirect } from "expo-router";
import { useSelector } from "react-redux";

export default function Index() {
  const { isLoggedIn } = useSelector((state: any) => state.user);

  if (isLoggedIn) {
    return <Redirect href="/(app)/home" />;
  } else {
    return <Redirect href="/(auth)" />;
  }
}