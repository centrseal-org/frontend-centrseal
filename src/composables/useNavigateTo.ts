/**
 * Summary: Composable function for navigating to different routes within the application
 * @copyright Copyright (c) 2024 CentrSeal. All rights reserved.
 * @file This file defines the useNavigateTo composable function.
 * @author Kasra Jannati
 */
import { useRouter } from "vue-router";

export const useNavigateTo = () => {
  const router = useRouter();

  const navigateTo = (route: string) => {
    router.push(route);
  };

  return { navigateTo };
};
