-- Create plans table if not exists
CREATE TABLE IF NOT EXISTS public.plans (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    price_monthly INTEGER NOT NULL,
    price_yearly INTEGER NOT NULL,
    features JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create subscriptions table if not exists
CREATE TABLE IF NOT EXISTS public.subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id),
    plan_id UUID NOT NULL REFERENCES public.plans(id),
    status TEXT NOT NULL,
    interval TEXT NOT NULL,
    current_period_start TIMESTAMP WITH TIME ZONE NOT NULL,
    current_period_end TIMESTAMP WITH TIME ZONE NOT NULL,
    cancel_at_period_end BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    used_health_board_analyses INTEGER DEFAULT 0,
    used_social_media_analyses INTEGER DEFAULT 0
);

-- Insert default plans
INSERT INTO public.plans (name, description, price_monthly, price_yearly, features)
VALUES
    ('Free', 'Get started with basic features', 0, 0, '{
        "health_board_analyses": 5,
        "social_media_analyses": 3,
        "record_mapping": "basic",
        "support": "community"
    }'::jsonb),
    ('Pro', 'Perfect for professionals', 2999, 29990, '{
        "health_board_analyses": 50,
        "social_media_analyses": 30,
        "record_mapping": "advanced",
        "support": "priority",
        "custom_reports": true
    }'::jsonb),
    ('Enterprise', 'For large organizations', 9999, 99990, '{
        "health_board_analyses": -1,
        "social_media_analyses": -1,
        "record_mapping": "advanced",
        "support": "priority",
        "custom_reports": true,
        "api_access": true
    }'::jsonb)
ON CONFLICT (id) DO NOTHING;
