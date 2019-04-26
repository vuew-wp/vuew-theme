/* eslint-disable */
export const helpers = {
  getComponent: (type, id = 0, path = '/') => {
    if (path === '/') {
      return 'home';
    }
    if (type === 404) {
      return 'four04';
    }
    if (type === 'post_type' && id > 0) {
      return 'single';
    }
    return type;
  },
  getArchiveEndpoint: current => {
    switch (current.type) {
      case 'post_type_archive':
        return `types/${current.type_value}`;
      case 'taxonomy':
        return `${current.rest_base}/${current.id}`;
      case 'home':
        return 'types/post';
    }
  },
  getArchivePaginationEndpoint: current => {
    switch (current.type) {
      case 'post_type_archive':
        return `${current.rest_base}?`;
      case 'taxonomy':
        if (
          current.type_value === 'post_tag' ||
          current.type_value === 'category'
        ) {
          return `posts?${current.rest_base}[]=${current.id}&`;
        }
        const restBase =
          Vuew.config.navigation.restBases.post_type[current.payload.post_type];
        return `${restBase}?taxonomies[]=${current.id}&`;

      case 'home':
        return 'posts?';
    }
  },
  prepareQuery: query => {
    return {
      id: query.id,
      payload: query,
      path: query.path,
      type: query.type,
      rest_base: query.rest_base,
      type_value: query.type_value,
      component: helpers.getComponent(query.type, query.id, query.path),
      isArchive: helpers.isArchive(query),
    };
  },
  isArchive: query => {
    return (
      (query.type === 'home' && Vuew.config.pageOnFront === 0) ||
      query.type === 'taxonomy' ||
      query.type === 'post_type_archive'
    );
  },
};
