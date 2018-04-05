import frameworkBuilder from './framework-builder';

export default (framework) => {
  const action =
		typeof framework === 'object' && !Array.isArray(framework)
			? frameworkBuilder.getBrowserStack
			: frameworkBuilder.get;
  return action(framework);
};
