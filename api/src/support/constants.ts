export enum Constants {
  DATETIME_FORMAT = 'Y-MM-D H:mm:s',
  PASSWORD_SALT = 3314686276654126011953801723336,
  SESSION_EXPIRES = 720,
  CRYPTO_SALT = '49Rg99Y5ou5y9Ewge9M9D8MS27WnDTu',
  CRYPTO_ALGORITH = 'aes-192-cbc',
  PAGGINATION_SIZE = 10
}

export const  DefaultProfileParams = { 
  name: 'Admin',
  description: 'Main profile admin',
  privilages: [
    'get_profiles_list',
    'create_profile',
    'delete_profile',
    'detials_profile',
    'update_profile',
    'get_teams_list',
    'create_team',
    'detials_team',
    'update_team',
    'delete_team',
    'assign_user_to_team',
    'unassign_user_to_team',
    'get_users_list',
    'create_user',
    'detials_user',
    'delete_user',
    'update_user',
    'get_projects_list',
    'get_all_projects_list',
    'create_project',
    'detials_project',
    'delete_project',
    'update_project'
  ].join(',')
}
