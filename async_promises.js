function fetchUserData(userId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (userId > 0) {
                const userData = {
                    id: userId,
                    name: "Zubenathi Ncobo",
                    email: "Zubenathi.ncobo@gmail.com",
                    registrationDate: new Date().toISOString()
                };
                resolve(userData);
            } else {
                reject(new Error("Invalid user ID. Must be positive."));
            }
        }, 1500);
        console.log(fetchUserData);
    });
}


function generateUserHTML(user) {
    return `
        <div>
            <h2>${user.name}</h2>
            <p>Email: ${user.email}</p>
            <p>Registered on: ${user.registrationDate}</p>
        </div>
    `;
}

function fetchUserPosts(userId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (userId > 0) {
                const posts = [
                    { id: 1, title: "First Post", content: "This is my first post!", userId: userId },
                    { id: 2, title: "Second Post", content: "This is my second post!", userId: userId }
                ];
                resolve(posts);
            } else {
                reject(new Error("Invalid user ID. Cannot fetch posts."));
            }
        }, 1000);
    });
}

async function getUserDataAndPosts(userId) {
    try {
        const user = await fetchUserData(userId); 
        const posts = await fetchUserPosts(userId); 
        console.log(generateUserHTML(user)); 
        console.log(posts); 
    } catch (error) {
        console.error(error.message);
    }
}

async function getUserDataAndPosts(userId) {
    try {
        console.log("Fetching user data...");
        const user = await fetchUserData(userId);
        console.log("User data received:", user);

        console.log("Fetching user posts...");
        const posts = await fetchUserPosts(userId);
        console.log("User posts received:", posts);

        return {
            user,
            posts
        };
    } catch (error) {
        console.error("Error:", error.message);
        throw error; 
    }
}

async function fetchMultipleUsers(userIds) {
    const userPromises = userIds.map(async (userId) => {
        try {
            return await fetchUserData(userId);
        } catch (error) {
            console.error(`Failed to fetch user ${userId}: ${error.message}`);
            return null; 
        }
    });
    
    const users = await Promise.all(userPromises);
    return users.filter(user => user !== null); 
}

async function fetchUsersAndTheirPosts(userIds) {
    const users = await fetchMultipleUsers(userIds); 
    console.log("Users fetched:", users);

    const postsPromises = users.map(async (user) => {
        try {
            const posts = await fetchUserPosts(user.id);
            return { ...user, posts }; 
        } catch (error) {
            console.error(`Failed to fetch posts for user ${user.id}: ${error.message}`);
            return { ...user, posts: [] };
        }
    });

    const usersWithPosts = await Promise.all(postsPromises);
    return usersWithPosts;
}

async function test() {
    console.log("Testing user fetch:");
    try {
        const userData = await getUserDataAndPosts(1);
        console.log(userData);
    } catch (error) {
        console.error("Test failed for single user fetch:", error);
    }


    console.log("Testing multiple user fetch:");
    const userIds = [1, 2, -1, 4]; 
    const multipleUsers = await fetchMultipleUsers(userIds);
    console.log("Fetched users:", multipleUsers);


    console.log("Testing users and their posts:");
    const usersWithPosts = await fetchUsersAndTheirPosts(userIds);
    console.log("Users with their posts:", usersWithPosts);
}


