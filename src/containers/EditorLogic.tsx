import * as React from "react";
import {bindActionCreators} from "redux";
import {connect} from 'react-redux';
import {hot} from "react-hot-loader";

import * as actions from "$redux/user/actions";
import Editor from "$components/Editor";

interface IDesignProps {
  minLPanel: boolean,

  changeMinLPanel(): void,
}

interface IDesignState {
}

class EditorLogic extends React.Component<IDesignProps, IDesignState> {
  render() {
    return (
      <Editor />
    );
  }
}

const mapStateToProps = (state, props) => ({
  minLPanel: state.user.minLPanel,
});
const mapDispatchToProps = (dispatch) => bindActionCreators({...actions}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(hot(module)(EditorLogic));
