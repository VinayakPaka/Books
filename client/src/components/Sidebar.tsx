import { Box, VStack, Text, HStack, Icon, Spacer, Flex } from '@chakra-ui/react';
import { FaBook, FaColumns } from 'react-icons/fa';
import LogoutButton from './LogoutButton';

const Sidebar = () => {
    return (
        <Box
            w="250px"
            bg="#2D3748" // Dark gray/blue for sidebar
            color="white"
            h="100vh"
            position="fixed"
            left={0}
            top={0}
            zIndex={100}
        >
            <Flex direction="column" h="100%">
                {/* Logo Section */}
                <HStack p="6" gap="3" align="center" borderBottom="1px solid" borderColor="gray.600">
                    <Icon as={FaBook} boxSize={6} />
                    <Text fontSize="xl" fontWeight="bold">Books Dashboard</Text>
                </HStack>

                {/* Navigation Links */}
                <VStack align="stretch" gap={0} mt={4}>
                    <HStack
                        px="6"
                        py="3"
                        bg="whiteAlpha.100"
                        borderLeft="4px solid"
                        borderColor="teal.400"
                        cursor="pointer"
                        _hover={{ bg: 'whiteAlpha.200' }}
                    >
                        <Icon as={FaColumns} mr="2" />
                        <Text>Dashboard</Text>
                    </HStack>
                </VStack>

                <Spacer />

                {/* Logout Button at bottom */}
                <Box p="6" borderTop="1px solid" borderColor="gray.600">
                    <LogoutButton variant="sidebar" />
                </Box>
            </Flex>
        </Box>
    );
};

export default Sidebar;
