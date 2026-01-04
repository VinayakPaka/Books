import { useAuth0 } from "@auth0/auth0-react";
import { Button, HStack, Text, Icon } from "@chakra-ui/react";
import { FaPowerOff } from "react-icons/fa";

interface LogoutButtonProps {
    variant?: 'sidebar' | 'default';
}

const LogoutButton = ({ variant = 'default' }: LogoutButtonProps) => {
    const { logout } = useAuth0();

    if (variant === 'sidebar') {
        return (
            <HStack
                gap="3"
                cursor="pointer"
                color="red.400"
                _hover={{ color: "red.300" }}
                onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
            >
                <Icon as={FaPowerOff} />
                <Text>Logout</Text>
            </HStack>
        );
    }

    return (
        <Button
            onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
            bg="white"
            color="red.500"
            _hover={{ bg: "red.50" }}
        >
            Log Out
        </Button>
    );
};

export default LogoutButton;
