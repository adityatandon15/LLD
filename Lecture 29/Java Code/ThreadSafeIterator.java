import java.util.Iterator;
import java.util.NoSuchElementException;

public class ThreadSafeLinkedList<T> implements Iterable<T> {
    
    private Node<T> head;
    
    // The shared lock object used to synchronize all access to the list's state
    private final Object lock = new Object();

    // Internal Node class
    private static class Node<T> {
        T data;
        Node<T> next;

        Node(T data) {
            this.data = data;
        }
    }

    // Example method to add items to the list (also synchronized)
    public void add(T item) {
        synchronized (lock) {
            Node<T> newNode = new Node<>(item);
            newNode.next = head;
            head = newNode;
        }
    }

    @Override
    public Iterator<T> iterator() {
        return new ThreadSafeIterator();
    }

    // The Custom Iterator
    private class ThreadSafeIterator implements Iterator<T> {
        private Node<T> current;      // The node to be returned by next()
        private Node<T> lastReturned; // The node most recently returned by next()
        private Node<T> prev;         // The node immediately preceding 'current'

        public ThreadSafeIterator() {
            synchronized (lock) {
                current = head;
                lastReturned = null;
                prev = null;
            }
        }

        @Override
        public boolean hasNext() {
            // Synchronize the check
            synchronized (lock) {
                return current != null;
            }
        }

        @Override
        public T next() {
            // Synchronize the pointer advancement
            synchronized (lock) {
                if (current == null) {
                    throw new NoSuchElementException();
                }
                
                // If we didn't just remove a node, advance the 'prev' pointer
                if (lastReturned != null) {
                    prev = lastReturned;
                }
                
                lastReturned = current;
                current = current.next;
                
                return lastReturned.data;
            }
        }

        @Override
        public void remove() {
            // Synchronize the structural modification
            synchronized (lock) {
                if (lastReturned == null) {
                    throw new IllegalStateException("next() must be called before remove(), and remove() cannot be called twice in a row.");
                }

                // Case 1: We are removing the very first node in the list
                if (lastReturned == head) {
                    head = current; // Bypass the head
                } 
                // Case 2: We are removing a node from the middle or end
                else {
                    prev.next = current; // Bypass the lastReturned node
                }

                // Nullify lastReturned to prevent consecutive remove() calls
                lastReturned = null;
            }
        }
    }
}
