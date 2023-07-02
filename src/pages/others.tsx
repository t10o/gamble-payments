import { User } from "@supabase/auth-helpers-nextjs";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";

import { ContentLayout } from "@/components/layouts";
import { Others } from "@/features/others";
import { useUser } from "@/hooks/use-user";
import { AuthState, authState } from "@/stores/auth";
import { redirect } from "@/utils/redirect";

interface Props {
  user: User;
}

export default function RankingPage({ user }: Props) {
  const { user: loginUser } = useUser(user.id);
  const setUser = useSetRecoilState<AuthState>(authState);

  useEffect(() => {
    if (loginUser) {
      setUser({
        id: loginUser!.id,
        nickname: loginUser!.nickname,
        like: loginUser!.like,
      });
    }
  }, []);

  return (
    <ContentLayout pageTitle="Others">
      <Others />
    </ContentLayout>
  );
}

export const getServerSideProps = redirect;
