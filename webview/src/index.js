import 'babel-polyfill';
import dva from 'dva';
import createLoading from 'dva-loading';
import { hashHistory } from 'dva/router';
import './index.css';

// 1. Initialize
const app = dva({
  history: hashHistory,
});

app.model(require('./models/app'));
app.model(require('./models/auth'));
app.model(require('./models/user'));
app.model(require('./models/builder'));


// 2. Plugins
app.use(createLoading());

// 3. Model
// app.model(require('./models/example'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
