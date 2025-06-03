// -> major releases -> API -> v1, v2


require('dotenv').config()
const express = require('express')
const { configureCors } = require('./config/corsConfig');
const { requestLogger, addTimeStamp } = require('./middleware/customMiddleware');
const { globalErrorhandler } = require('./middleware/errorHandler');
const { urlVersioning } = require('./middleware/apiVersioning');
const { createRateLimiter } = require('./middleware/rateLimiting');
const itemRoutes = require('./routes/item-routes')


const app = express();
const PORT = process.env.PORT || 3000


//express json middleware
app.use(requestLogger)
app.use(addTimeStamp)

app.use(configureCors());
app.use(createRateLimiter(2, 15 * 60 * 100)) //100 request for 15 minutes
app.use(express.json());

app.use(urlVersioning('v1'));
app.use('/api/v1', itemRoutes)

app.use(globalErrorhandler)

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
itemRoutes