import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import deliveryRoutes from './src/routes/routes.js';

const { response, urlencoded } = express;
const app = express();
app.use(morgan('tiny'));
app.use(cors())
app.use(urlencoded({
  extended: true,
  limit: '50mb'
}))
app.use(express.json({ limit: '50mb' }));
app.use('/delivery_service', deliveryRoutes);
app.set('views', './src/views');
app.set('view engine', 'ejs');
app.get('/', (req, res) => {
  res.render('index')
})
const port = process.env.DELIVERY_SERVICE_PORT || 8080;

app.listen(port, () => console.log('listening on port: ', port));