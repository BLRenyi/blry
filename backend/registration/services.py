from django.db.models import Max
from datetime import datetime
from .models import RegisterAnswer, RegisterQuestion, RegisterStepQuestion, RegisterUser, RegisterStep, RegisterUserStep

'''
There needs to be extra logic to ensure username stored matches the token generated
'''
def retrieve_register_user(username, token):
    try:
        user = RegisterUser.objects.get(username = username)
    except RegisterUser.DoesNotExist:
        max_register_id_dict = RegisterUser.objects.aggregate(max_reg_id_col = Max('register_id'))
        max_register_id = max_register_id_dict.get('max_reg_id_col') + 1
        RegisterUser.objects.create(register_id=max_register_id, username=username, register_completed=False)
        user = RegisterUser.objects.get(username = username)
    return user
'''
There needs to be extra logic to ensure username stored matches the token generated
'''
def validate_register_token(registerid, token):
    try:
        user = RegisterUser.objects.get(register_id = registerid)      
    except RegisterUser.DoesNotExist:
        return False
    return True
def add_user_step(registerid):
    sys_steps = list(RegisterStep.objects.filter(step_seq__isnull=False, step_seq__gt=0))
    user = RegisterUser.objects.get(register_id = registerid) 
    for sys_step in sys_steps:
        try:
            user_step = RegisterUserStep.objects.get(step_id=sys_step, register_id=user)      
        except RegisterUserStep.DoesNotExist:
            max_user_step_id_dict = RegisterUserStep.objects.aggregate(max_user_step_id_col=Max('user_step_id'))
            if max_user_step_id_dict.get('max_user_step_id_col') is None:
                max_user_step_id = 1
            else:
                max_user_step_id = max_user_step_id_dict.get('max_user_step_id_col') + 1                  
                RegisterUserStep.objects.create(user_step_id=max_user_step_id, register_id=user, step_id=sys_step)

def get_user_step_with_questions(registerid, stepid):
    sys_step = RegisterStep.objects.get(step_id = stepid)
    if sys_step.step_seq > 1:
        prev_sys_step = RegisterStep.objects.get(step_seq = (sys_step.step_seq - 1))
        user_previous_step = RegisterUserStep.objects.get(register_id = registerid, step_id = prev_sys_step.step_id)
        if user_previous_step.completed:
            step_questions = list(RegisterStepQuestion.objects.filter(step_id = stepid)) 
            step_question_qids = list(RegisterStepQuestion.objects.filter(step_id = stepid).values_list('question_id'))
            step_answers = list(RegisterAnswer.objects
                .filter(register_id = registerid, question_id__in = step_question_qids))                     
            return step_questions, step_answers
        else:
            return RegisterStepQuestion.objects.none(), RegisterAnswer.objects.none()
    else:
        step_questions = list(RegisterStepQuestion.objects.filter(step_id = stepid))
        step_question_qids = list(RegisterStepQuestion.objects.filter(step_id = stepid).values_list('question_id'))
        step_answers = list(RegisterAnswer.objects
            .filter(register_id = registerid, question_id__in = step_question_qids))
        return step_questions, step_answers
    
def update_user_step_with_questions(registerid, stepid, answersList, isSubmit):
    sys_step = RegisterStep.objects.get(step_id=stepid)
    try:
        user_Step = RegisterUserStep.objects.get(register_id=registerid, step_id = stepid)
    except RegisterUserStep.DoesNotExist:
        max_user_step_id_dict = RegisterUserStep.objects.aggregate(max_user_step_id_col = Max('user_step_id'))
        if max_user_step_id_dict.get('max_user_step_id_col') is None:
            max_user_step_id = 1
        else:
            max_user_step_id = max_user_step_id_dict.get('max_user_step_id_col') + 1
        user = RegisterUser.objects.get(register_id=registerid)
        RegisterUserStep.objects.create(user_step_id=max_user_step_id, register_id=user, step_id=sys_step, submit=isSubmit)       
        user_Step = RegisterUserStep.objects.get(register_id=registerid, step_id = stepid)
    for answer in answersList:
        ##--- TODO: check the logic to only update/input the questions with answers ---##
        if 'question_id' in answer and 'content' in answer and (answer['content'] != None):
            try:
                user = RegisterUser.objects.get(register_id=registerid)
                question = RegisterQuestion.objects.get(question_id=answer['question_id'])
                userAnswer = RegisterAnswer.objects.get(register_id=registerid, question_id=answer['question_id'])
                userAnswer.content = answer['content']
                if 'addtional_input' in answer:
                    userAnswer.addtional_input = answer['addtional_input']
                    userAnswer.save(update_fields=['content', 'addtional_input'])
                else:
                    userAnswer.save(update_fields=['content'])
            except RegisterAnswer.DoesNotExist:
                max_answer_id_dict = RegisterAnswer.objects.aggregate(max_answer_id_col = Max('answer_id'))
                if max_answer_id_dict.get('max_answer_id_col') is None:
                    max_answer_id = 1
                else:
                    max_answer_id = max_answer_id_dict.get('max_answer_id_col') + 1
                RegisterAnswer.objects.create(answer_id=max_answer_id, register_id=user, question_id=question, content=answer['content'])
    if isSubmit == 'true':
        user_Step.submitted = True
        user_Step.submitted_time = datetime.now()
        ##--- Once the user submits the answers, check the question approval_required flag, mark the step complete if no approval needed ---##
        if sys_step.approval_required == False:
            user_Step.completed = True
        user_Step.save(update_fields=['submitted', 'submitted_time', 'completed'])
