import { Flex, Text, HStack, Avatar, Icon } from '@chakra-ui/react';
import { useAuth0 } from '@auth0/auth0-react';
import { FaChevronDown } from 'react-icons/fa';

const Header = () => {
    const { user } = useAuth0();

    return (
        <Flex
            as="header"
            align="center"
            justify="space-between"
            w="100%"
            px="8"
            py="4"
            bg="white"
            boxShadow="sm"
            borderBottom="1px solid"
            borderColor="gray.200"
        >
            <Text fontSize="xl" fontWeight="medium" color="gray.700">
                Dashboard
            </Text>

            <HStack gap="3" cursor="pointer">
                <Avatar.Root size="sm">
                    <Avatar.Image src={user?.picture} />
                    <Avatar.Fallback name={user?.name} />
                </Avatar.Root>
                <Text color="gray.600" fontWeight="medium" fontSize="sm">
                    {user?.name || 'Admin'}
                </Text>
                <Icon as={FaChevronDown} color="gray.400" boxSize="3" />
            </HStack>
        </Flex>
    );
};

export default Header;
