const app = require("./api/app");

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`\n** Server is running on http://localhost:${port} **\n`);
    
});
