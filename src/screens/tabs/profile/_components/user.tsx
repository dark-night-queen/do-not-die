// core dependencies
import React from "react";
import { Camera, Settings } from "lucide-react-native";

// core components
import {
  Avatar,
  AvatarFallbackText,
  Text,
  VStack,
  Button,
  ButtonIcon,
  HStack,
} from "@/components/ui";

// constants
import { User as UserType } from "@/constants/user";

interface IUserType {
  user: UserType;
}

// component logic
export const User = ({ user }: IUserType) => {
  const name = user?.firstName
    ? `${user?.firstName} ${user?.lastName}`
    : "Anonymous";

  return (
    <HStack className="items-center gap-4">
      <Avatar size="lg" className="rounded-xl">
        <AvatarFallbackText>{name}</AvatarFallbackText>

        <Button className="absolute -bottom-1 -right-1 rounded-xl p-2">
          <ButtonIcon as={Camera} size="sm" className="text-white" />
        </Button>
      </Avatar>

      <VStack className="flex-1">
        <Text className="text-xl font-bold">{name}</Text>
        <Text className="text-sm text-gray-400">{user?.email}</Text>
      </VStack>

      <Button variant="link" className="rounded-lg p-2.5">
        <ButtonIcon as={Settings} className="text-gray-400" />
      </Button>
    </HStack>
  );
};
