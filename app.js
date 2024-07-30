


const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    response.send("welcome to the API")
})