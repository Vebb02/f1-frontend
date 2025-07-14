import {
  AdminBingomasters,
  AdminPortal,
  Backup,
  FlagChooseRace,
  FlagChooseYear,
  FlagRegister,
  LogChooseCategory,
  LogChooseDate,
  LogView,
  SeasonAdd,
  SeasonAlias,
  SeasonChooseCategory,
  SeasonChooseYear,
  SeasonCompetitors,
  SeasonConstructors,
  SeasonCutoff,
  SeasonDrivers,
  SeasonManageRaces,
  SeasonPoints,
  SeasonRoute
} from './';
import { StatsRace } from '../public';
import axios from 'axios';
import { Outlet, Route, Routes } from 'react-router';
import { useState, useEffect } from 'react';
import { ErrorNotAdmin, ErrorUnknown } from '../error';

function AdminProtectRoute() {
  const [content, setContent] = useState(null);

  useEffect(() => {
    axios.get('/api/public/header')
      .then(res => {
        if (!res.data.isAdmin) {
          setContent(
            <>
              <title>F1 Tipping</title>
              <ErrorNotAdmin />
            </>
          );
        } else {
          setContent(<Outlet />);
        }
      })
      .catch(err => {
        console.error(err);
        setContent(
          <>
            <title>F1 Tipping</title>
            <ErrorUnknown />
          </>
        );
      });
  }, [])
  return (
    <>
      {content ? content : ''}
    </>
  )
}

function AdminRoute() {

  return (
    <>
      <Routes>
        <Route element={<AdminProtectRoute />}>
          <Route index element={<AdminPortal />} />
          <Route path="backup" element={<Backup />} />
          <Route path="bingo" element={<AdminBingomasters />} />
          <Route path="flag">
            <Route index element={<FlagChooseYear />} />
            <Route path=":year">
              <Route index element={<FlagChooseRace />} />
              <Route path=":raceId" element={<FlagRegister />} />
            </Route>
          </Route>
          <Route path="log">
            <Route index element={<LogChooseCategory />} />
            <Route path=":logType">
              <Route index element={<LogChooseDate />} />
              <Route path=":date" element={<LogView />} />
            </Route>
          </Route>
          <Route path="season">
            <Route index element={<SeasonChooseYear />} />
            <Route path="add" element={<SeasonAdd />} />
            <Route path=":year" element={<SeasonRoute />}>
              <Route index element={<SeasonChooseCategory />} />
              <Route path="manage">
                <Route index element={<SeasonManageRaces />} />
                <Route path=":raceId" element={<StatsRace />} />
              </Route>
              <Route path="cutoff" element={<SeasonCutoff />} />
              <Route path="competitors">
                <Route index element={<SeasonCompetitors />} />
                <Route path="constructors" element={<SeasonConstructors />} />
                <Route path="drivers" element={<SeasonDrivers />} />
                <Route path="alias" element={<SeasonAlias />} />
              </Route>
              <Route path="points" element={<SeasonPoints />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </>
  )
}

export default AdminRoute
