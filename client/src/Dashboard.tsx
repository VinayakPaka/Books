import { useState } from 'react';
import {
    Box,
    Heading,
    Button,
    Table,
    IconButton,
    Flex,
    useDisclosure,
    Text,
    Spinner,
    Center,
    HStack,
} from '@chakra-ui/react';
import { useQuery, useMutation } from '@apollo/client/react';
import { GET_BOOKS } from './graphql/queries';
import { DELETE_BOOK } from './graphql/mutations';
import BookModal from './components/BookModal';
import { FaPlus, FaEdit, FaTrash, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Dashboard = () => {
    const { data, loading, error } = useQuery<any>(GET_BOOKS);
    const [selectedBook, setSelectedBook] = useState<{ id: number; name: string; description: string } | null>(null);
    const { open, onOpen, onClose } = useDisclosure();

    const [deleteBook] = useMutation(DELETE_BOOK, {
        refetchQueries: [{ query: GET_BOOKS }],
        onCompleted: () => {
            console.log('Book deleted.');
        },
        onError: (err: any) => {
            console.error('Error deleting book.', err.message);
            window.alert('Error deleting book: ' + err.message);
        }
    });

    const handleAdd = () => {
        setSelectedBook(null);
        onOpen();
    };

    const handleEdit = (book: any) => {
        setSelectedBook(book);
        onOpen();
    };

    const handleDelete = (id: number) => {
        if (window.confirm("Are you sure you want to delete this book?")) {
            deleteBook({ variables: { id } });
        }
    };

    if (loading) return <Center p={10}><Spinner size="xl" color="teal.500" /></Center>;
    if (error) return <Text color="red.500">Error: {error.message}</Text>;

    return (
        <Box>
            <Heading size="lg" color="gray.700" mb="6">Books Management</Heading>

            <Box bg="white" borderRadius="lg" boxShadow="sm" border="1px solid" borderColor="gray.200">
                {/* Card Header */}
                <Flex justifyContent="space-between" alignItems="center" p="6" borderBottom="1px solid" borderColor="gray.100">
                    <Heading size="md" color="gray.700">Books</Heading>
                    <Button
                        bg="#0F766E" // Teal 700ish
                        color="white"
                        _hover={{ bg: "#0D9488" }}
                        onClick={handleAdd}
                        size="md"
                        fontSize="sm"
                        px="4"
                    >
                        <FaPlus style={{ marginRight: '8px', display: 'inline' }} /> Add Book
                    </Button>
                </Flex>

                {/* Table */}
                <Box overflowX="auto">
                    <Table.Root variant="outline">
                        <Table.Header bg="gray.50">
                            <Table.Row>
                                <Table.ColumnHeader color="gray.600" fontWeight="medium" py="4" pl="6">ID</Table.ColumnHeader>
                                <Table.ColumnHeader color="gray.600" fontWeight="medium" py="4">Name</Table.ColumnHeader>
                                <Table.ColumnHeader color="gray.600" fontWeight="medium" py="4">Description</Table.ColumnHeader>
                                <Table.ColumnHeader color="gray.600" fontWeight="medium" py="4">Actions</Table.ColumnHeader>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {data?.books && data.books.length > 0 ? (
                                data.books.map((book: any, index: number) => (
                                    <Table.Row key={book.id} _hover={{ bg: "gray.50" }}>
                                        <Table.Cell color="gray.600" pl="6">{index + 1}</Table.Cell>
                                        <Table.Cell color="gray.800" fontWeight="medium">{book.name}</Table.Cell>
                                        <Table.Cell color="gray.600">{book.description}</Table.Cell>
                                        <Table.Cell>
                                            <HStack gap={2}>
                                                <Button
                                                    size="sm"
                                                    bg="#FDE047" // Yellow 300
                                                    color="gray.800"
                                                    _hover={{ bg: "#FACC15" }}
                                                    onClick={() => handleEdit(book)}
                                                    fontSize="xs"
                                                    px="3"
                                                >
                                                    <FaEdit style={{ marginRight: '6px' }} /> Edit
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    bg="#EF4444" // Red 500
                                                    color="white"
                                                    _hover={{ bg: "#DC2626" }}
                                                    onClick={() => handleDelete(book.id)}
                                                    fontSize="xs"
                                                    px="3"
                                                >
                                                    <FaTrash style={{ marginRight: '6px' }} /> Delete
                                                </Button>
                                            </HStack>
                                        </Table.Cell>
                                    </Table.Row>
                                ))
                            ) : (
                                <Table.Row>
                                    <Table.Cell colSpan={4}>
                                        <Center py="8">
                                            <Text color="gray.500">No books found.</Text>
                                        </Center>
                                    </Table.Cell>
                                </Table.Row>
                            )}
                        </Table.Body>
                    </Table.Root>
                </Box>

                {/* Footer / Pagination */}
                <Flex justifyContent="space-between" alignItems="center" p="4" bg="gray.50" borderTop="1px solid" borderColor="gray.100" borderBottomRadius="lg">
                    <Text fontSize="sm" color="gray.600">
                        Showing 1 to {data?.books.length} of {data?.books.length} results
                    </Text>
                    <HStack gap={1}>
                        <IconButton
                            aria-label="Previous"
                            size="sm"
                            variant="outline"
                            bg="white"
                            disabled
                        >
                            <FaChevronLeft />
                        </IconButton>
                        <Button size="sm" variant="solid" bg="#3B82F6" color="white" _hover={{ bg: "#2563EB" }}>
                            1
                        </Button>
                        <IconButton
                            aria-label="Next"
                            size="sm"
                            variant="outline"
                            bg="white"
                            disabled
                        >
                            <FaChevronRight />
                        </IconButton>
                    </HStack>
                </Flex>
            </Box>

            <BookModal isOpen={open} onClose={onClose} book={selectedBook} />
        </Box>
    );
};

export default Dashboard;
