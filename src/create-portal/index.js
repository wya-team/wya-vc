import Core from './core';

const CreatePortal = (globalOptions = {}, wrapper) => {
	// TODO: 额外处理
	return new Core(globalOptions, wrapper);
};

CreatePortal.Core = Core;

export default CreatePortal;


