import { Box, Flex, Spinner, Center, Text } from '@chakra-ui/react';
import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from './components/LoginButton';
import Dashboard from './Dashboard';
import Sidebar from './components/Sidebar';
import Header from './components/Header';

function App() {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return (
      <Center h="100vh" w="100vw" bg="gray.100">
        <Spinner size="xl" color="teal.500" />
      </Center>
    );
  }

  return (
    <Box minH="100vh" w="100vw" bg="#F3F4F6"> {/* Light gray background like image */}
      {isAuthenticated ? (
        <Flex w="100%" h="100vh" overflow="hidden">
          {/* Sidebar - Fixed width */}
          <Sidebar />

          {/* Main Content Area */}
          <Flex direction="column" flex="1" ml="250px" h="100%" overflowY="auto">
            <Header />
            <Box p="8">
              <Dashboard />
            </Box>
          </Flex>
        </Flex>
      ) : (
        /* Login Screen */
        <Center h="100vh" bg="#2D3748">
          <Box textAlign="center" p="8" bg="white" borderRadius="lg" boxShadow="lg" maxW="md">
            <Text fontSize="2xl" fontWeight="bold" color="gray.700" mb="4">
              Welcome to Book App
            </Text>
            <Text fontSize="lg" color="gray.600" mb="6">
              Please log in to manage your books.
            </Text>
            <LoginButton />
          </Box>
        </Center>
      )}
    </Box>
  );
}

export default App;
