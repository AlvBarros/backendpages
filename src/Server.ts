import app from './AppConfig'

const PORT = 3000 //TODO: set env variables

app.listen(PORT, async () => {
    console.log(`Listening on port ${PORT}`);
})