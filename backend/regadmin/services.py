from datetime import datetime, timezone
from registration.models import RegisterUserStep

'''
There needs to be extra logic to ensure username stored matches the token generated
'''
def validate_super_user(username, token):
    try:
        print('To verify the user is indeed with super user access')
        #print('username: ' + username)
        #print('token' + token)
    except:
        return False
    return True

def update_user_step(username, userStepList, isApprove):
    errSteps = []
    for userStep in userStepList:
        ##--- TODO: check the logic to only update/input the questions with answers ---##
        if 'step_id' in userStep and 'register_id' in userStep:
            try:
                userStep = RegisterUserStep.objects.get(register_id=userStep['register_id'], step_id=userStep['step_id'])
                if userStep.completed:
                    userStep.update_err = 'It is already completed.'
                    errSteps.append(userStep)
                elif userStep.approved:
                    userStep.update_err = 'It is already approved.'
                    errSteps.append(userStep)
                else:
                    if isApprove and userStep.submitted:
                        userStep.approved = True
                        userStep.approved_by = username
                        userStep.approved_time = datetime.now(timezone.utc)
                        userStep.completed = True
                        userStep.save(update_fields=['approved', 'approved_by', 'approved_time', 'completed'])
                    else:
                        userStep.submitted = False
                        userStep.submitted_time = None
                        userStep.save(update_fields=['submitted', 'submitted_time'])                    
            except Exception as err:
                userStep.update_err = str(err)
                errSteps.append(userStep)
    return errSteps
