import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Registration from './components/reg/Registration';
import ViewStep from './components/reg/ViewStep';
import ViewAllSites from './components/reg/ViewAllSites';
import Approval from './components/regadmin/Approval';
import ViewUserStep from './components/regadmin/ViewUserStep';
import SetupStep from './components/regadmin/SetupStep';
import ViewSysStep from './components/regadmin/ViewSysStep';
import CreateSysStep from './components/regadmin/CreateSysStep';
import ViewSysQuestion from './components/regadmin/ViewSysQuestion';
import CreateSysQuestion from './components/regadmin/CreateSysQuestion';

export default function App() {
  return (
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Registration />}>
          <Route path="/register/:stepid" element={<ViewStep />}>

          </Route>
        </Route>
        <Route path="/regstep" element={<ViewAllSites />}>
        </Route>
        <Route path="/regadmin/approval" element={<Approval />}></Route>
        <Route path="/regadmin/approval/:regid/:stepid" element={<ViewUserStep />} />
        <Route path="/regadmin/setupstep" element={<SetupStep />}></Route>
        <Route path="/regadmin/setupstep/:stepid" element={<ViewSysStep />} />
        <Route path="/regadmin/setupstep/createstep" element={<CreateSysStep />} />
        <Route path="/regadmin/setupstep/question/:questionid" element={<ViewSysQuestion />} />
        <Route path="/regadmin/setupstep/createquestion/:stepid" element={<CreateSysQuestion />} />
      </Routes>
    </BrowserRouter>    
  );
}
