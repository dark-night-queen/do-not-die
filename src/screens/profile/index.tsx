import Layout from "./_layout";
import { User } from "./_components/user";
import { Stats } from "./_components/stats";
import { Menu } from "./_components/menu";
import { ActionButtons } from "./_components/action-button";

export default () => {
  return (
    <Layout>
      <User />
      <Stats />
      <Menu />
      <ActionButtons />
    </Layout>
  );
};
