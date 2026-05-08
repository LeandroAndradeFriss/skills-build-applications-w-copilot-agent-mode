from django.core.management.base import BaseCommand
from octofit_tracker.models import User, Team, Activity, Workout, Leaderboard
from datetime import date

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **kwargs):
        # Clear existing data
        for obj in User.objects.all():
            obj.delete()
        for obj in Team.objects.all():
            obj.delete()
        for obj in Activity.objects.all():
            obj.delete()
        for obj in Workout.objects.all():
            obj.delete()
        for obj in Leaderboard.objects.all():
            obj.delete()

        # Create Teams
        marvel = Team.objects.create(name='marvel', description='Marvel Superheroes')
        dc = Team.objects.create(name='dc', description='DC Superheroes')

        # Create Users
        tony = User.objects.create(name='Tony Stark', email='tony@marvel.com', team=marvel.name)
        steve = User.objects.create(name='Steve Rogers', email='steve@marvel.com', team=marvel.name)
        bruce = User.objects.create(name='Bruce Wayne', email='bruce@dc.com', team=dc.name)
        clark = User.objects.create(name='Clark Kent', email='clark@dc.com', team=dc.name)

        # Create Activities
        Activity.objects.create(user=tony, type='run', duration=30, date=date(2023, 1, 1))
        Activity.objects.create(user=steve, type='cycle', duration=45, date=date(2023, 1, 2))
        Activity.objects.create(user=bruce, type='swim', duration=60, date=date(2023, 1, 3))
        Activity.objects.create(user=clark, type='run', duration=50, date=date(2023, 1, 4))

        # Create Workouts
        Workout.objects.create(name='Pushups', description='Do 20 pushups', difficulty='easy')
        Workout.objects.create(name='Situps', description='Do 30 situps', difficulty='medium')
        Workout.objects.create(name='Squats', description='Do 40 squats', difficulty='hard')

        # Create Leaderboard
        Leaderboard.objects.create(user=tony, points=100)
        Leaderboard.objects.create(user=steve, points=90)
        Leaderboard.objects.create(user=bruce, points=110)
        Leaderboard.objects.create(user=clark, points=95)

        self.stdout.write(self.style.SUCCESS('Test data populated successfully.'))
