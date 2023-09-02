import { FC, ReactNode, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Outlet, Navigate } from "react-router-dom";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { persistor } from '../../store/store';
import { updateTimeLeft, finishQuiz } from '../../store/quiz'

import { Box } from '@mui/material';
import Header from "../../components/Header";

interface SidebarLayoutProps {
  children?: ReactNode;
}

const SidebarLayout: FC<SidebarLayoutProps> = ({ children }) => {
  const dispatch = useDispatch<any>();
  const [user, isLoggedIn, timeLeft, isSubmitted] = useSelector(
    (state: any) => [state?.session.user, state?.session.isLoggedIn, state?.quiz.timeLeft, state?.quiz.isSubmitted],
    shallowEqual
    );
  const clearPersistedData = () => {
    persistor.purge().then(() => {
      console.log('Persisted data cleared successfully');
      window.location.href = "/";
    });
  };

  return (
    <Box
      sx={{
        flex: 1,
        height: '100%'
      }}
    >
      {!isLoggedIn && <Navigate to="/" replace={true} />}
      {isSubmitted && <Navigate to="/report" replace={true} />}
      

      <Header timeLeft={timeLeft} updateTimeLeft={updateTimeLeft} finishQuiz = {finishQuiz} dispatch={dispatch} clearPersistedData={clearPersistedData} isSubmitted={isSubmitted}/>
      {children || <Outlet />}
    </Box>
  );
};

SidebarLayout.propTypes = {
  children: PropTypes.node,
};

export default SidebarLayout;
