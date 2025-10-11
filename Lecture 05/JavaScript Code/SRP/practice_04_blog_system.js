// Practice 04: Blog System
// This code violates SRP - BlogPost class handles multiple responsibilities

class BlogPost {
    constructor(title, content, author) {
        this.title = title;
        this.content = content;
        this.author = author;
        this.comments = [];
        this.views = 0;
        this.likes = 0;
        this.createdAt = new Date();
    }

    // Responsibility 1: Post data management
    getTitle() {
        return this.title;
    }

    getContent() {
        return this.content;
    }

    // Responsibility 2: Comment management (should be separate)
    addComment(username, commentText) {
        const comment = {
            username,
            text: commentText,
            timestamp: new Date()
        };
        this.comments.push(comment);
        console.log(`Comment added by ${username}`);
    }

    deleteComment(index) {
        if (index >= 0 && index < this.comments.length) {
            this.comments.splice(index, 1);
            console.log(`Comment deleted`);
        }
    }

    // Responsibility 3: Analytics tracking (should be separate)
    incrementViews() {
        this.views++;
        console.log(`Views: ${this.views}`);
    }

    trackEngagement() {
        const engagementRate = ((this.likes + this.comments.length) / this.views) * 100;
        console.log(`Engagement Rate: ${engagementRate.toFixed(2)}%`);
        return engagementRate;
    }

    // Responsibility 4: Content formatting (should be separate)
    renderHTML() {
        console.log(`<article>`);
        console.log(`  <h1>${this.title}</h1>`);
        console.log(`  <p>By ${this.author}</p>`);
        console.log(`  <div>${this.content}</div>`);
        console.log(`  <span>Likes: ${this.likes} | Comments: ${this.comments.length}</span>`);
        console.log(`</article>`);
    }

    // Responsibility 5: SEO optimization (should be separate)
    generateMetaTags() {
        console.log(`<meta name="title" content="${this.title}">`);
        console.log(`<meta name="description" content="${this.content.substring(0, 150)}...">`);
        console.log(`<meta name="author" content="${this.author}">`);
    }

    // Responsibility 6: Database operations (should be separate)
    publishToDatabase() {
        console.log(`Publishing post "${this.title}" to database...`);
        console.log(`Author: ${this.author}`);
        console.log(`Published at: ${this.createdAt}`);
    }
}

// Main execution
function main() {
    const post = new BlogPost(
        "Understanding SOLID Principles",
        "SOLID principles are five design principles in object-oriented programming...",
        "Jane Developer"
    );
    
    post.publishToDatabase();
    post.incrementViews();
    post.addComment("user1", "Great article!");
    post.addComment("user2", "Very helpful, thanks!");
    post.likes = 15;
    post.trackEngagement();
    post.renderHTML();
    post.generateMetaTags();
}

main();


