const config: any = {
  projects: [
    // {
    //   name: 'Public-SVN',
    //   url: 'public-svn',
    //   description: 'VSP',
    //   svn: 'https://svn.vsp.tu-berlin.de/repos/public-svn/matsim/scenarios/countries',
    //   need_password: false,
    //   thumbnail: '/tu-logo.png',
    // },
    // {
    //   name: 'Local Files',
    //   url: 'local',
    //   description: 'Use scripts/serve.py',
    //   svn: 'http://localhost',
    //   need_password: true,
    //   thumbnail: '/tu-logo.png',
    // },
    {
      name: 'Berlin TRT',
      url: 'Berlin',
      description: 'Master Thesis Hugo Castro',
      svn:
        'https://svn.vsp.tu-berlin.de/repos/public-svn/matsim/scenarios/countries/de/berlin/projects/trtberlin',
      need_password: false,
      thumbnail: '/thumb-gladbeck.jpg',
    },
  ],
}

export default config
