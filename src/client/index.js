import createClientApp from './createClient';
import routes from '../routes/routes';

console.log('!!Master App Created!!');
createClientApp()(routes);
