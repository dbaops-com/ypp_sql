"""
Django settings for auto_deploy project.

Generated by 'django-admin startproject' using Django 1.10.6.

For more information on this file, see
https://docs.djangoproject.com/en/1.10/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/1.10/ref/settings/
"""
import os
import datetime
from libs import util

CONF_DATA = util.conf_path()

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/1.10/howto/deployment/checklist/
STATIC_URL = '/static/'
# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'u)zall!ag&mci+ja5u&-6*1e^ufyu)l4i8+^=mw$845@k!ie+3.txt'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

# ALLOWED_HOSTS = [str(CONF_DATA.ipaddress).split(':')[0]]
ALLOWED_HOSTS = ['*']

# Application definition
AUTH_USER_MODEL = 'core.Account'

INSTALLED_APPS = [
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'core.apps.CoreConfig',
    'rest_framework',
    'django.contrib.staticfiles'
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware'
]
CORS_ORIGIN_ALLOW_ALL = True
CSRF_ORIGIN_ALLOW_ALL = True
CORS_ALLOW_METHODS = (
    'DELETE',
    'GET',
    'OPTIONS',
    'POST',
    'PUT',
)

ROOT_URLCONF = 'settingConf.urls'

WSGI_APPLICATION = 'settingConf.wsgi.application'

# Database
# https://docs.djangoproject.com/en/1.10/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': CONF_DATA.db,
        'USER': CONF_DATA.username,
        "PORT": CONF_DATA.port,
        "PASSWORD": CONF_DATA.password,
        "HOST": CONF_DATA.address
    }
}

# Password validation
# https://docs.djangoproject.com/en/1.10/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# Internationalization
# https://docs.djangoproject.com/en/1.10/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'Asia/Shanghai'

USE_I18N = True

USE_L10N = True

USE_TZ = True

REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': (
        #'rest_framework.permissions.AllowAny',
        'rest_framework.permissions.IsAuthenticated',
    ),
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_jwt.authentication.JSONWebTokenAuthentication',
    ),
}
JWT_AUTH = {
    'JWT_RESPONSE_PAYLOAD_HANDLER':
        'rest_framework_jwt.utils.jwt_response_payload_handler',
    'JWT_EXPIRATION_DELTA': datetime.timedelta(seconds=3000000),
}

LOGGING = {
    'version': 1,
    'disable_existing_loggers': True,
    'formatters': {
        'standard': {
            'format': '%(asctime)s [%(threadName)s:%(thread)d] \
                      [%(name)s:%(lineno)d] [%(levelname)s]- %(message)s'}
        # 日志格式
    },
    'filters': {
    },
    'handlers': {
        'error': {
            'level': 'ERROR',
            'class': 'logging.handlers.RotatingFileHandler',
            'filename': 'log/error.log',
            'maxBytes': 1024 * 1024 * 100,
            'backupCount': 1,
            'formatter': 'standard'
        },
        'default': {
            'level': 'INFO',
            'class': 'logging.handlers.RotatingFileHandler',
            'filename': 'log/all.log',  # 日志输出文件
            'maxBytes': 1024 * 1024 * 100,  # 文件大小
            'backupCount': 1,  # 备份份数
            'formatter': 'standard',  # 使用哪种formatters日志格式
        },
        'console': {
            'level': 'DEBUG',
            'class': 'logging.StreamHandler',
            'formatter': 'standard'
        }
    },
    'loggers': {
        'django': {
            'handlers': ['default', 'console'],
            'level': 'INFO',
            'propagate': False
        },
        'Yearning.core.views': {
            'handlers': ['error'],
            'level': 'ERROR',
            'propagate': True
        }

    }
}


TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR,'templates')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]
