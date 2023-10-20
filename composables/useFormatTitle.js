const titleTableReplace = (title) => {
  const split = title.split('_')
  for (let i = 0; i < split.length; i++) {
    split[i] = split[i][0].toUpperCase() + split[i].substr(1);
  }
  return split.join(' ')
}