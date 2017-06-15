import React from 'react';
import { connect } from 'dva';
import styles from './Log.css';

function Log() {
  return (
    <div className={styles.normal}>
      Route Component: Log
    </div>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(Log);
