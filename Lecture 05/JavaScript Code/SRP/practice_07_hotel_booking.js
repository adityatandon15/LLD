// Practice 07: Hotel Booking System
// This code violates SRP - Hotel class has multiple responsibilities

class Hotel {
    constructor(name, location) {
        this.name = name;
        this.location = location;
        this.rooms = [];
        this.bookings = [];
        this.guests = [];
    }

    // Responsibility 1: Room management (should be separate)
    addRoom(roomNumber, type, pricePerNight) {
        const room = {
            roomNumber,
            type,
            pricePerNight,
            isAvailable: true
        };
        this.rooms.push(room);
        console.log(`Room ${roomNumber} (${type}) added at Rs ${pricePerNight}/night`);
    }

    checkRoomAvailability(roomNumber) {
        const room = this.rooms.find(r => r.roomNumber === roomNumber);
        return room ? room.isAvailable : false;
    }

    // Responsibility 2: Booking management (should be separate)
    createBooking(guestName, roomNumber, checkIn, checkOut) {
        const room = this.rooms.find(r => r.roomNumber === roomNumber);
        if (!room || !room.isAvailable) {
            console.log(`Room ${roomNumber} not available`);
            return null;
        }

        const booking = {
            id: `BK${Date.now()}`,
            guestName,
            roomNumber,
            checkIn,
            checkOut,
            status: 'confirmed'
        };
        
        this.bookings.push(booking);
        room.isAvailable = false;
        console.log(`Booking ${booking.id} created for ${guestName}`);
        return booking;
    }

    cancelBooking(bookingId) {
        const booking = this.bookings.find(b => b.id === bookingId);
        if (booking) {
            booking.status = 'cancelled';
            const room = this.rooms.find(r => r.roomNumber === booking.roomNumber);
            room.isAvailable = true;
            console.log(`Booking ${bookingId} cancelled`);
        }
    }

    // Responsibility 3: Payment calculation (should be separate)
    calculateBookingCost(booking) {
        const room = this.rooms.find(r => r.roomNumber === booking.roomNumber);
        const checkIn = new Date(booking.checkIn);
        const checkOut = new Date(booking.checkOut);
        const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
        const cost = nights * room.pricePerNight;
        
        console.log(`Booking cost: ${nights} nights x Rs ${room.pricePerNight} = Rs ${cost}`);
        return cost;
    }

    processPayment(bookingId, cardNumber) {
        const booking = this.bookings.find(b => b.id === bookingId);
        if (booking) {
            const amount = this.calculateBookingCost(booking);
            console.log(`Processing payment of Rs ${amount}`);
            console.log(`Card: **** **** **** ${cardNumber.slice(-4)}`);
            console.log(`Payment successful!`);
        }
    }

    // Responsibility 4: Guest management (should be separate)
    registerGuest(name, email, phone) {
        const guest = { name, email, phone, membershipPoints: 0 };
        this.guests.push(guest);
        console.log(`Guest ${name} registered`);
        return guest;
    }

    updateGuestPoints(guestName, points) {
        const guest = this.guests.find(g => g.name === guestName);
        if (guest) {
            guest.membershipPoints += points;
            console.log(`${guestName} now has ${guest.membershipPoints} points`);
        }
    }

    // Responsibility 5: Email notifications (should be separate)
    sendBookingConfirmation(email, booking) {
        console.log(`\nSending confirmation email to ${email}`);
        console.log(`Hotel: ${this.name}`);
        console.log(`Booking ID: ${booking.id}`);
        console.log(`Room: ${booking.roomNumber}`);
        console.log(`Check-in: ${booking.checkIn}`);
        console.log(`Check-out: ${booking.checkOut}`);
    }

    // Responsibility 6: Report generation (should be separate)
    generateOccupancyReport() {
        const totalRooms = this.rooms.length;
        const occupiedRooms = this.rooms.filter(r => !r.isAvailable).length;
        const occupancyRate = (occupiedRooms / totalRooms) * 100;
        
        console.log(`\n=== Occupancy Report ===`);
        console.log(`Hotel: ${this.name}`);
        console.log(`Total Rooms: ${totalRooms}`);
        console.log(`Occupied: ${occupiedRooms}`);
        console.log(`Occupancy Rate: ${occupancyRate.toFixed(2)}%`);
    }
}

// Main execution
function main() {
    const hotel = new Hotel("Grand Palace", "New Delhi");
    
    hotel.addRoom(101, "Deluxe", 3000);
    hotel.addRoom(102, "Suite", 5000);
    hotel.addRoom(103, "Standard", 2000);
    
    hotel.registerGuest("Priya Patel", "priya@example.com", "9876543210");
    
    const booking = hotel.createBooking("Priya Patel", 101, "2025-10-15", "2025-10-17");
    
    if (booking) {
        hotel.processPayment(booking.id, "1234567890123456");
        hotel.sendBookingConfirmation("priya@example.com", booking);
        hotel.updateGuestPoints("Priya Patel", 100);
    }
    
    hotel.generateOccupancyReport();
}

main();


