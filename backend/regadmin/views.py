import json
from django.db.models import Max
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import RegisterSysQuestionDetailSerializer, RegisterSysStepDetailSerializer
from .services import update_user_step, validate_super_user
from registration.models import RegisterQuestion, RegisterQuestionOption, RegisterStep, RegisterStepQuestion, RegisterUserStep
from registration.serializers import RegisterStepSerializer, RegisterUserStepSerializer

# For Super User Management
@api_view(['POST'])
def get_step_to_approve(request):
    username = request.POST.get('username')
    token = request.POST.get('token')
    ##--- TODO: matching token to the super user account ---##
    if validate_super_user(username, token):
        user_steps = list(RegisterUserStep.objects.filter(submitted=True, approved=False))
        serializer = RegisterUserStepSerializer(user_steps, many=True)
    else:
        return Response(status=status.HTTP_401_UNAUTHORIZED)    
    return Response(serializer.data)
@api_view(['POST'])
def approve_user_step(request):
    username = request.POST.get('username')
    usersteps_json = request.POST.get('usersteps') 
    usersteps_list = json.loads(usersteps_json)
    try:
        err_steps = update_user_step(username, usersteps_list, True)
        serializer = RegisterUserStepSerializer(err_steps, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except:
        ##--- TODO: log the real issue and return a user friendly msg. ---##
        return Response(data={'success': False, 'errmsg': "Failed to approve"}, status=status.HTTP_417_EXPECTATION_FAILED)
@api_view(['POST'])
def reject_user_step(request):
    username = request.POST.get('username')
    usersteps_json = request.POST.get('usersteps') 
    usersteps_list = json.loads(usersteps_json)
    try:
        err_steps = update_user_step(username, usersteps_list, False)
        serializer = RegisterUserStepSerializer(err_steps, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except:
        ##--- TODO: log the real issue and return a user friendly msg. ---##
        return Response(data={'success': False, 'errmsg': "Failed to reject"}, status=status.HTTP_417_EXPECTATION_FAILED)
@api_view(['POST'])
def get_sys_step_list(request): 
    username = request.POST.get('username')
    token = request.POST.get('token')
    if validate_super_user(username, token):
        steps = list(RegisterStep.objects.all())
        serializer = RegisterStepSerializer(steps, many=True)
    else:
        return Response(status=status.HTTP_401_UNAUTHORIZED)    
    return Response(serializer.data)
@api_view(['POST'])
def update_step_seq(request): 
    username = request.POST.get('username')
    token = request.POST.get('token')
    sys_step_list_json = request.POST.get('syssteplist') 
    sys_step_list = json.loads(sys_step_list_json)
    if validate_super_user(username, token):
        try:
            print('sys_step_list', sys_step_list)
            return Response(data={'success': True, 'errmsg': ""}, status=status.HTTP_200_OK)
        except Exception:
            return Response(data={'success': False, 'errmsg': "Failed to reject"}, status=status.HTTP_417_EXPECTATION_FAILED)
    else:
        return Response(status=status.HTTP_401_UNAUTHORIZED)
@api_view(['POST'])
def get_step_detail(request): 
    username = request.POST.get('username')
    token = request.POST.get('token')
    step_id_seq = request.POST.get('stepid') 
    if validate_super_user(username, token):
        try:
            sys_step = RegisterStep.objects.get(step_id=step_id_seq)
            sys_step_questions = list(RegisterStepQuestion.objects.filter(step_id=step_id_seq))
            serializer = RegisterSysStepDetailSerializer({'sys_step': sys_step, 'step_questions': sys_step_questions})
            return Response(serializer.data)
        except Exception as err:
            return Response(data={'success': False, 'errmsg': "Failed to get step info", 'err': str(err)}, status=status.HTTP_417_EXPECTATION_FAILED)
    else:
        return Response(status=status.HTTP_401_UNAUTHORIZED)
@api_view(['POST'])
def update_step_detail(request): 
    username = request.POST.get('username')
    token = request.POST.get('token')
    step_id_seq = request.POST.get('stepid') 
    is_create_req = request.POST.get('iscreate') 
    sys_step_json = request.POST.get('sysstep') 
    sys_step_obj = json.loads(sys_step_json)
    if validate_super_user(username, token):
        if is_create_req == 'true':
            try:
                description = None
                if 'description' in sys_step_obj:
                    description = sys_step_obj['description']
                max_step_id_dict = RegisterStep.objects.aggregate(max_step_id_col=Max('step_id'))
                if max_step_id_dict.get('max_step_id_col') is None:
                    max_step_id = 1
                else:
                    max_step_id = max_step_id_dict.get('max_step_id_col') + 1                  
                    RegisterStep.objects.create(
                        step_id=max_step_id, step_seq=0, subject=sys_step_obj['subject'],
                        description = description, approval_required = sys_step_obj['approval_required'])
                return Response(data={'success': True, 'errmsg': ""}, status=status.HTTP_200_OK)
            except Exception as err:
                return Response(data={'success': False, 'errmsg': "Failed to update", 'err': str(err)}, status=status.HTTP_417_EXPECTATION_FAILED)
        else:
            try:
                sys_step = RegisterStep.objects.get(step_id=step_id_seq)
                sys_step.subject = sys_step_obj['subject']
                if 'description' in sys_step_obj:
                    sys_step.description = sys_step_obj['description']
                sys_step.approval_required = sys_step_obj['approval_required']
                sys_step.save(update_fields=['subject', 'description', 'approval_required']) 
                return Response(data={'success': True, 'errmsg': ""}, status=status.HTTP_200_OK)
            except Exception as err:
                return Response(data={'success': False, 'errmsg': "Failed to update", 'err': str(err)}, status=status.HTTP_417_EXPECTATION_FAILED)
        
    else:
        return Response(status=status.HTTP_401_UNAUTHORIZED)
@api_view(['POST'])
def get_question_detail(request): 
    username = request.POST.get('username')
    token = request.POST.get('token')
    question_id_seq = request.POST.get('questionid') 
    if validate_super_user(username, token):
        try:
            sys_question = RegisterQuestion.objects.get(question_id=question_id_seq)
            sys_question_options = list(RegisterQuestionOption.objects.filter(question_id=question_id_seq))
            serializer = RegisterSysQuestionDetailSerializer({'sys_question': sys_question, 'question_options': sys_question_options})
            return Response(serializer.data)
        except Exception as err:
            return Response(data={'success': False, 'errmsg': "Failed to get question info", 'err': str(err)}, status=status.HTTP_417_EXPECTATION_FAILED)
    else:
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    
@api_view(['POST'])
def update_question_detail(request): 
    username = request.POST.get('username')
    token = request.POST.get('token')
    step_id_seq = request.POST.get('stepid') 
    question_id_seq = request.POST.get('questionid') 
    is_create_req = request.POST.get('iscreate') 
    sys_question_json = request.POST.get('sysquestion') 
    sys_question_obj = json.loads(sys_question_json)
    if validate_super_user(username, token):
        try:
            sys_question = RegisterQuestion.objects.get(question_id=question_id_seq)
            sys_question_options = list(RegisterQuestionOption.objects.filter(question_id=question_id_seq))
            serializer = RegisterSysQuestionDetailSerializer({'sys_question': sys_question, 'question_options': sys_question_options})
            return Response(serializer.data)
        except Exception as err:
            return Response(data={'success': False, 'errmsg': "Failed to get question info", 'err': str(err)}, status=status.HTTP_417_EXPECTATION_FAILED)
    else:
        return Response(status=status.HTTP_401_UNAUTHORIZED)