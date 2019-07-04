import Home from "./home";
import { connect } from "react-redux";

const mapStateToProps = state => ({
  tree: state.mainReducer.tree,
  currentNode: state.mainReducer.currentNode
});

// const mapDispatchToProps = {
//   addModal: modal => addModal(modal)
// };

export default connect(
  mapStateToProps,
  null
)(Home);
